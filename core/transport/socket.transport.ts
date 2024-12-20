import { io, Socket } from "socket.io-client"
import { TransportOptions, MessageData } from "../types/transport"
import { version } from "../../package.json"
import { genId } from "../../lib/utils/genId"
import {
    ClientEmitter,
    SocketEventHandlers
} from "../types/client-emitter"
import { TransportError } from "../errors"
import { Platform, DefaultPlatform } from "../platform"
import { StructuredSocketMessageType } from "../types/schemas"
import { AbstractTransport } from "./abstract.transport"

export class SocketTransport extends AbstractTransport {
    name: string = "socket-transport"
    private socket: Socket | null = null
    private eventHandlers: Map<keyof SocketEventHandlers, Set<Function>> = new Map()
    private heartbeatInterval?: NodeJS.Timeout

    constructor(
        options: TransportOptions,
        platform: Platform = new DefaultPlatform(),
        emitter: ClientEmitter
    ) {
        super(options, platform, emitter)
    }

    async connect(): Promise<void> {
        if (this.socket) return

        this.socket = io(this.coreOptions.socketUrl, {
            query: {
                token: this.coreOptions.token,
                client: "widget",
                clientVersion: version,
                ...this.coreOptions.queryParams,
            },
            transports: ["websocket"],
            closeOnBeforeunload: true,
            autoConnect: true,
        })

        this.setupSocketListeners()
        this.startHeartbeat()

        await new Promise<void>((resolve) => {
            this.socket?.once("connect", () => resolve())
        })
    }

    private setupSocketListeners(): void {
        if (!this.socket) return

        this.socket.on("connect", () => {
            this.emit("connection_status", "connected")
        })

        this.socket.on("disconnect", () => {
            this.emit("connection_status", "disconnected")
        })

        this.socket.on("structured_message", (data) => {
            this.handleStructuredMessage(data)
        })

        this.socket.on("ack:chat_message:delivered", (data) => {
            this.emit("message_delivered", data)
        })

        this.socket.on("user_message_broadcast", (data) => {
            this.emit("user_message", data)
        })

        this.socket.on("heartbeat:ack", (data) => {
            this.emit("heartbeat_ack", data)
        })
    }

    private handleStructuredMessage(message: StructuredSocketMessageType): void {
        switch (message.type) {
            case "message": {
                const botMessage = message
                this.emit("bot_message", {
                    type: "FROM_BOT",
                    component: "TEXT",
                    id: botMessage.server_message_id || genId(),
                    timestamp: new Date(botMessage.timestamp).getTime(),
                    attachments: botMessage.attachments,
                    data: {
                        message: botMessage.value,
                    },
                    agent: botMessage.agent,
                })
                break
            }

            case "chat_event": {
                const chatEvent = message
                this.emit("chat_event", {
                    component: "CHAT_EVENT",
                    type: "FROM_BOT",
                    data: {
                        event: chatEvent.value.event,
                        message: chatEvent.value.message
                    },
                    timestamp: chatEvent.timestamp
                })
                break
            }

            case "session_update": {
                const sessionUpdate = message
                this.emit("session_update", sessionUpdate.value.session)
                break
            }

            case "options": {
                const options = message
                this.emit("keyboard_options", options.value.options)
                break
            }

            case "ui": {
                const uiUpdate = message
                this.emit("ui_update", {
                    type: "FROM_BOT",
                    component: uiUpdate.value.name,
                    data: uiUpdate.value.request_response,
                    timestamp: uiUpdate.timestamp,
                })
                break
            }
        }
    }

    private startHeartbeat(): void {
        if (this.heartbeatInterval) return

        const sendHeartbeat = () => {
            if (!this.socket?.connected) return

            this.socket.emit("heartbeat", {
                timestamp: this.platform.date.now(),
                ...this.coreOptions.queryParams
            })
        }

        sendHeartbeat() // Initial heartbeat
        this.heartbeatInterval = setInterval(sendHeartbeat, 50 * 1000)
    }

    async sendMessage(messageData: MessageData): Promise<void> {
        if (!this.socket?.connected) {
            throw new TransportError("Socket not connected")
        }
        const session = this.sessionManager.currentSession
        if (!session) throw new Error("No active session")

        this.socket.emit("send_chat", {
            ...messageData,
            session_id: session.id
        })
    }

    joinSession(sessionId: string): void {
        this.socket?.emit("join_session", { session_id: sessionId })
    }

    leaveSession(sessionId: string): void {
        this.socket?.emit("leave_session", { session_id: sessionId })
    }

    disconnect(): void {
        if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval)
            this.heartbeatInterval = undefined
        }

        if (this.socket) {
            this.socket.disconnect()
            this.socket = null
        }
    }

    isConnected(): boolean {
        return !!this.socket?.connected
    }

    on<K extends keyof SocketEventHandlers>(
        event: K,
        callback: SocketEventHandlers[K]
    ): { unsub: () => void } {
        if (!this.eventHandlers.has(event)) {
            this.eventHandlers.set(event, new Set())
        }
        this.eventHandlers.get(event)?.add(callback)
        return {
            unsub: () => this.off(event, callback)
        }
    }

    off<K extends keyof SocketEventHandlers>(
        event: K,
        callback: SocketEventHandlers[K]
    ): void {
        this.eventHandlers.get(event)?.delete(callback)
    }

    private emit<K extends keyof SocketEventHandlers>(
        event: K,
        data: Parameters<SocketEventHandlers[K]>[0]
    ): void {
        this.eventHandlers.get(event)?.forEach((callback) => callback(data))
    }
} 