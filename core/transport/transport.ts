import { MessageData, TransportOptions } from "../types/transport"
import { PubSub } from "../types/pub-sub"

export interface TransportEvents extends Record<string, any> {
    "transport:message:received": MessageData
    "transport:error": { error: Error }
    "transport:status": { status: "connected" | "disconnected" }
}

export interface TransportState {
    connected: boolean;
}

export abstract class MessagingTransport extends PubSub<TransportEvents> {
    #state: TransportState = {
        connected: false
    }

    constructor(protected readonly options: TransportOptions) {
        super()
    }

    abstract connect(): Promise<void>
    abstract disconnect(): void
    abstract sendMessage(message: MessageData): Promise<void>

    protected setState(newState: Partial<TransportState>) {
        this.#state = { ...this.#state, ...newState }

        // Emit status change event if connected state changes
        if ('connected' in newState) {
            this.publish('transport:status', {
                status: newState.connected ? 'connected' : 'disconnected'
            })
        }
    }

    isConnected(): boolean {
        return this.#state.connected
    }

    getState(): TransportState {
        return { ...this.#state }
    }

}
