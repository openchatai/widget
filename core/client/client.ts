import { CoreOptions } from "../types"
import { Transport } from "../types/transport"
import { SocketTransport } from "../transport/socket.transport"
import { ApiCaller } from "./api"
import { ClientEmitter, ClientEmitterEvents } from "../types/client-emitter"
import { SessionManager } from "../session/session-manager"
import { Platform, DefaultPlatform } from "../platform"
import { ChatSessionType } from "../types/schemas"
import mitt from 'mitt'
import { HttpTransport } from "@core/transport/http.transport"

export class ApiClient {
    private messagingTransport: Transport
    private options: CoreOptions
    private api: ApiCaller
    private sessionManager: SessionManager
    private _emitter: ClientEmitter

    constructor(
        options: CoreOptions,
        private readonly platform: Platform = new DefaultPlatform()
    ) {

        this.options = {
            ...options,
            transport: 'socket',
            pollingInterval: 3000,
            headers: {
                "X-Bot-Token": options.token,
                "X-Widget-Version": this.platform.env.version || 'unknown-version',
                ...options.headers,
            },
        }

        this.api = new ApiCaller({
            apiUrl: this.options.apiUrl,
            token: this.options.token,
        })

        this._emitter = mitt<ClientEmitterEvents>()

        this.sessionManager = new SessionManager(this.emitter)
        switch (options.transport) {
            case 'socket':
                this.messagingTransport = new SocketTransport(
                    {
                        api: this.api,
                        sessionManager: this.sessionManager,
                        coreOptions: this.options,
                    },
                    this.platform,
                    this.emitter
                )
                break;
            case "http":
                this.messagingTransport = new HttpTransport(
                    {
                        api: this.api,
                        sessionManager: this.sessionManager,
                        coreOptions: this.options,
                        pollingInterval: this.options.pollingInterval,
                    },
                    this.platform,
                    this.emitter
                )
                break;
            default:
                throw new Error(`Transport ${options.transport} not supported`)
        }
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