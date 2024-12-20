import { ClientEmitter, MessageData, TransportOptions } from "@core/types"
import { AbstractTransport } from "./abstract.transport"
import { DefaultPlatform, Platform } from "@core/platform"

type HttpTransportOptions = { pollingInterval?: number }

export class HttpTransport extends AbstractTransport<HttpTransportOptions> {
    private pollingInterval?: NodeJS.Timeout;
    private _isConnected: boolean = false

    constructor(
        options: TransportOptions & HttpTransportOptions,
        platform: Platform = new DefaultPlatform(),
        emitter: ClientEmitter
    ) {
        super(options, platform, emitter)
    }

    startPooling(): void {
        if (this.pollingInterval) return
        this.pollingInterval = setInterval(() => {
            // 
        }, this.options.pollingInterval)
    }

    set connected(value: boolean) {
        this._isConnected = value
        this.emitter.emit("connected", { connected: value })
    }

    async connect(): Promise<void> {
        this.startPooling()
        this.connected = true
    }

    isConnected(): boolean {
        return this._isConnected
    }

    async disconnect(): Promise<void> {
        if (this.pollingInterval) clearInterval(this.pollingInterval)
        this.connected = false
    }

    sendMessage(): Promise<void> {
        return Promise.resolve()
    }
}