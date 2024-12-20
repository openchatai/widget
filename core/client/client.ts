import { CoreOptions } from "../types"
import { Transport } from "../types/transport"
import { SocketTransport } from "../transport/socket.transport"
import { ApiCaller } from "./api"
import { SocketEventHandlers, ClientEmitter } from "../types/client-emitter"
import { SessionManager } from "../session/session-manager"
import { Platform, DefaultPlatform } from "../platform"
import { ChatSessionType } from "../types/schemas"
import mitt from 'mitt'

export class ApiClient {
    private messagingTransport: Transport
    private options: CoreOptions
    private api: ApiCaller
    private sessionManager: SessionManager
    private _emitter: ClientEmitter

    constructor(options: CoreOptions,
        private readonly platform: Platform = new DefaultPlatform()) {

        this.options = {
            transport: 'http',
            pollingInterval: 3000,
            ...options,
            headers: {
                "X-Bot-Token": options.token,
                "X-Widget-Version": this.platform.env.version,
                ...options.headers,
            }
        }

        this.api = new ApiCaller({
            apiUrl: this.options.apiUrl,
            token: this.options.token,
        })

        this._emitter = mitt<SocketEventHandlers>()

        this.sessionManager = new SessionManager(this.emitter)

        this.messagingTransport = new SocketTransport(
            {
                api: this.api,
                sessionManager: this.sessionManager,
                coreOptions: this.options,
            },
            this.platform,
            this.emitter
        )
    }

    async getSession() {
        const currentSession = this.sessionManager.currentSession

        if (currentSession) {
            return currentSession
        }

        const newSession = await this.createSession()
        this.sessionManager.setSession(newSession)
        return newSession
    }

    async createSession(): Promise<ChatSessionType> {
        const session = await this.api.createSession()
        this.sessionManager.setSession(session)
        return session
    }

    async connect(): Promise<void> {
        await this.messagingTransport.connect()
    }

    async disconnect(): Promise<void> {
        this.messagingTransport.disconnect()
    }

    setTransport(transport: Transport): void {
        this.messagingTransport.disconnect()
        this.messagingTransport = transport
        this.connect()
    }

    get emitter() {
        return this._emitter
    }
}