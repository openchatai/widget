import { Platform, DefaultPlatform } from "../platform"
import { MessageData, TransportOptions } from "../types/transport"
import { MessagingTransport } from "./transport"
import { io, Socket } from "socket.io-client"

export class SocketTransport extends MessagingTransport {
    private socket: Socket | null = null
    private connected = false

    constructor(
        private readonly socketOptions: TransportOptions,
        private readonly platform: Platform = new DefaultPlatform()
    ) {
        super(socketOptions)
    }

    async connect(): Promise<void> {
        if (this.socket) {
            this.socket.disconnect()
        }

        this.socket = io(this.socketOptions.coreOptions.socketUrl, {
            transports: ["websocket"],
            auth: {
                token: this.socketOptions.coreOptions.token
            }
        })

        this.setupSocketEvents()
    }

    disconnect(): void {
        if (this.socket) {
            this.socket.disconnect()
            this.socket = null
        }
        this.connected = false
        this.events.publish('transport:status', { status: 'disconnected' })
    }

    isConnected(): boolean {
        return this.connected
    }

    async sendMessage(message: MessageData): Promise<void> {
        if (!this.socket || !this.connected) {
            const error = new Error('Socket not connected')
            this.events.publish('transport:error', { error })
            throw error
        }

        try {
            this.socket.emit('message', message)
        } catch (error) {
            this.events.publish('transport:error', { error: error as Error })
            throw error
        }
    }

    private setupSocketEvents(): void {
        if (!this.socket) return

        this.socket.on('connect', () => {
            this.connected = true
            this.events.publish('transport:status', { status: 'connected' })
        })

        this.socket.on('disconnect', () => {
            this.connected = false
            this.events.publish('transport:status', { status: 'disconnected' })
        })

        this.socket.on('error', (error: Error) => {
            this.events.publish('transport:error', { error })
        })

        this.socket.on('message', (message: MessageData) => {
            this.events.publish('transport:message:received', message)
        })
    }
} 