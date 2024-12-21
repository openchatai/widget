import { MessageData, TransportOptions } from "../types/transport"
import { PubSub } from "../types/pub-sub"

export interface TransportEvents extends Record<string, any> {
    "transport:message:received": MessageData
    "transport:error": { error: Error }
    "transport:status": { status: "connected" | "disconnected" }
}

export abstract class MessagingTransport {
    protected readonly events = new PubSub<TransportEvents>()

    constructor(protected readonly options: TransportOptions) { }

    abstract connect(): Promise<void>
    abstract disconnect(): void
    abstract sendMessage(message: MessageData): Promise<void>
    abstract isConnected(): boolean

    on<K extends keyof TransportEvents>(event: K, callback: (data: TransportEvents[K]) => void): () => void {
        return this.events.subscribe(event, callback)
    }
}
