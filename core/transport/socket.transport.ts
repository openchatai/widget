import { io, Socket } from "socket.io-client"
import { TransportOptions, MessageData } from "../types/transport"
import { version } from "../../package.json"
import { ClientEmitter } from "../types/client-emitter"
import { TransportError } from "../errors"
import { Platform, DefaultPlatform } from "../platform"
import { StructuredSocketMessageType } from "../types/schemas"
import { AbstractTransport } from "./abstract.transport"
import { genId } from "@core/utils/genId"

export class SocketTransport extends AbstractTransport {
    private socket: Socket | null = null
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
            this.emitter.emit("connection_status", "connected")
        })

        this.socket.on("disconnect", () => {
            this.emitter.emit("connection_status", "disconnected")
        })

        this.socket.on("structured_message", (data) => {
            this.handleStructuredMessage(data)
        })

        this.socket.on("ack:chat_message:delivered", (data) => {
            this.emitter.emit("message_delivered", data)
        })

        this.socket.on("user_message_broadcast", (data) => {
            this.emitter.emit("user_message", data)
        })

        this.socket.on("heartbeat:ack", (data) => {
            this.emitter.emit("heartbeat_ack", data)
        })
    }

    private handleStructuredMessage(message: StructuredSocketMessageType): void {
        switch (message.type) {
            case "message": {
                const botMessage = message
                this.emitter.emit("bot_message", {
                    type: "FROM_BOT",
                    component: "TEXT",
                    id: botMessage.server_message_id,
                    timestamp: botMessage.timestamp,
                    attachments: botMessage.attachments,
                    data: {
                        message: botMessage.value,
                    },
                    agent: botMessage.agent,
                })
                break
            }

            case "session_update": {
                const sessionUpdate = message
                this.emitter.emit("session_update", sessionUpdate.value.session)
                break
            }

            case "options": {
                const options = message
                this.emitter.emit("keyboard_options", options.value.options)
                break
            }

            case "ui": {
                const uiVal = message.value
                this.emitter.emit("bot_message", {
                    type: "FROM_BOT",
                    component: uiVal.name,
                    data: uiVal.request_response,
                    id: genId(),
                    agent: message.agent,
                    timestamp: message.timestamp,
                })
                break
            }

            default: {
                console.log("Unknown message type", message)
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
} 