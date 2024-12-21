import { TransportOptions, MessageData } from "../types/transport"
import { SessionManager } from "../session/session-manager"
import { CoreOptions } from "../types"
import { ApiCaller } from "../client/api"
import { Platform, DefaultPlatform } from "../platform"
import { ClientEmitter } from "../types/client-emitter"

export abstract class AbstractTransport<Extra extends Record<string, any> = Record<string, any>> {
    sessionManager: SessionManager
    #api: ApiCaller
    #coreOptions: CoreOptions

    constructor(
        protected options: TransportOptions & Extra,
        protected readonly platform: Platform = new DefaultPlatform(),
        protected readonly emitter: ClientEmitter
    ) {
        this.sessionManager = options.sessionManager
        this.#api = options.api
        this.#coreOptions = options.coreOptions
        this.emitter = emitter
    }

    abstract connect(): Promise<void>
    abstract disconnect(): void
    abstract isConnected(): boolean
    abstract sendMessage(messageData: MessageData): Promise<void>
} 