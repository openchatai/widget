import { CoreOptions } from "../types"
import { ApiCaller } from "./api"
import { createConfig } from "./config"

export type RequiredOptions = Required<Omit<CoreOptions, 'contactToken'>> & {
    contactToken: string | undefined | null
}

export class ApiClient {
    private readonly _options: ReturnType<typeof createConfig>
    private readonly api: ApiCaller

    constructor(
        options: CoreOptions,
    ) {
        this._options = createConfig(options)

        this.api = new ApiCaller({
            apiUrl: this._options.getApiConfig().apiUrl,
            token: this._options.getApiConfig().token,
            coreOptions: options,
        })
    }

}
