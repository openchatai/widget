import { CoreOptions } from "../types"
import { ApiCaller } from "./api"


export type RequiredOptions = Required<Omit<CoreOptions, 'contactToken'>> & {
    contactToken: string | undefined | null
}

export class ApiClient {
    private readonly _options: CoreOptions
    private readonly api: ApiCaller

    constructor(
        options: CoreOptions,
    ) {
        this._options = options;

        this.api = new ApiCaller({
            apiUrl: this.getOptions.apiUrl,
            token: this.getOptions.token,
            coreOptions: options,
        })
    }

    private get getOptions(): RequiredOptions {
        return {
            ...this._options,
            apiUrl: this._options.apiUrl ?? "https://api-v2.opencopilot.so/backend",
            socketUrl: this._options.socketUrl ?? "https://api-v2.opencopilot.so",
            transport: this._options.transport ?? 'socket',
            pollingInterval: this._options.pollingInterval ?? 3000,
            headers: {
                ...(this._options.headers ?? {}),
                "X-Bot-Token": this._options.token,
            },
            queryParams: this._options.queryParams ?? {},
            pathParams: this._options.pathParams ?? {},
            bot: this._options.bot ?? {},
            contactToken: this._options.contactToken,
            debug: this._options.debug ?? false,
            language: this._options.language ?? "en",
            user: this._options.user ?? {},
        }
    }
}