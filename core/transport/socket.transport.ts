import { Platform, DefaultPlatform } from "../platform"
import { MessageData, TransportOptions } from "../types/transport"
import { MessagingTransport } from "./transport"
import { io, Socket } from "socket.io-client"

export class SocketTransport extends MessagingTransport {
    private socket: Socket | null = null

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
        this.setState({ connected: false })
    }

    async sendMessage(message: MessageData): Promise<void> {
        if (!this.socket || !this.isConnected()) {
            const error = new Error('Socket not connected')
            this.publish('transport:error', { error })
            throw error
        }

        try {
            this.socket.emit('message', message)
        } catch (error) {
            this.publish('transport:error', { error: error as Error })
            throw error
        }
    }

    private setupSocketEvents(): void {
        if (!this.socket) return

        this.socket.on('connect', () => {
            this.setState({ connected: true })
        })

        this.socket.on('disconnect', () => {
            this.setState({ connected: false })
        })

        this.socket.on('error', (error: Error) => {
            this.publish('transport:error', { error })
        })

        this.socket.on('message', (message: MessageData) => {
            this.publish('transport:message:received', message)
        })
    }
} 