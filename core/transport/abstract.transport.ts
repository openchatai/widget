import { Transport, TransportOptions, MessageData } from "../types/transport"
import { SessionManager } from "../session/session-manager"
import { CoreOptions } from "../types"
import { ApiCaller } from "../client/api"
import { Platform, DefaultPlatform } from "../platform"
import { ClientEmitter } from "../types/client-emitter"

export abstract class AbstractTransport implements Transport {
    protected sessionManager: SessionManager
    protected api: ApiCaller
    protected coreOptions: CoreOptions

    constructor(
        protected options: TransportOptions,
        protected readonly platform: Platform = new DefaultPlatform(),
        protected readonly emitter: ClientEmitter
    ) {
        this.sessionManager = options.sessionManager
        this.api = options.api
        this.coreOptions = options.coreOptions
        this.platform = platform
        this.emitter = emitter
    }

    abstract connect(): Promise<void>
    abstract disconnect(): void
    abstract isConnected(): boolean
    abstract sendMessage(messageData: MessageData): Promise<void>

    protected validateSession() {
        const session = this.sessionManager.currentSession
        if (!session) throw new Error("No active session")
        return session
    }
} 