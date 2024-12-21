import { Platform, DefaultPlatform } from "../platform"
import { MessageData, TransportOptions } from "../types/transport"
import { MessagingTransport } from "./transport"

interface HttpTransportOptions extends TransportOptions {
    pollingInterval: number
}

export class HttpTransport extends MessagingTransport {
    private connected = false
    private pollingInterval?: NodeJS.Timeout

    constructor(
        private readonly httpOptions: HttpTransportOptions,
        private readonly platform: Platform = new DefaultPlatform()
    ) {
        super(httpOptions)
    }

    async connect(): Promise<void> {
        this.connected = true
        this.events.publish('transport:status', { status: 'connected' })
        this.startPolling()
    }

    disconnect(): void {
        this.connected = false
        if (this.pollingInterval) {
            clearInterval(this.pollingInterval)
        }
        this.events.publish('transport:status', { status: 'disconnected' })
    }

    isConnected(): boolean {
        return this.connected
    }

    async sendMessage(message: MessageData): Promise<void> {
        if (!this.connected) {
            const error = new Error('Transport not connected')
            this.events.publish('transport:error', { error })
            throw error
        }

        try {
            await this.httpOptions.api.sendMessage(message)
        } catch (error) {
            this.events.publish('transport:error', { error: error as Error })
            throw error
        }
    }

    private startPolling(): void {
        if (this.pollingInterval) {
            clearInterval(this.pollingInterval)
        }

        this.pollingInterval = setInterval(async () => {
            if (!this.connected) return

            try {
                const session = await this.httpOptions.sessionManager.getOrCreateSession()
                const messages = await this.httpOptions.api.getMessages(session.id)

                messages.forEach(message => {
                    this.events.publish('transport:message:received', message)
                })
            } catch (error) {
                this.events.publish('transport:error', { error: error as Error })
            }
        }, this.httpOptions.pollingInterval)
    }
}