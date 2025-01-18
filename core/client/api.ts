import { User } from "@core/types";
import { SendChatDto, WidgetVoteDto } from "../types/schemas-v2";
import { NormalizedConfig } from "./config";
import { basicClient, Dto } from "@core/sdk";

export interface ApiCallerOptions {
    config: NormalizedConfig;
}

export class ApiCaller {
    #client: ReturnType<typeof basicClient>;

    constructor(private readonly options: ApiCallerOptions) {
        this.#client = this.createClient(options.config.user)
    }

    createClient = (user: User) => {
        const consumerHeader = {
            claim: "",
            value: "",
        };

        if (user?.email) {
            consumerHeader.claim = "email";
            consumerHeader.value = user.email;
        } else if (user?.phone) {
            consumerHeader.claim = "phone";
            consumerHeader.value = user.phone;
        }

        return basicClient({
            baseUrl: this.options.config.apiUrl,
            onRequest: ({ request }) => {
                request.headers.set("X-Bot-Token", this.options.config.token);
                request.headers.set(
                    "X-Consumer-Id",
                    `${consumerHeader.claim}:${consumerHeader.value}`,
                );
                request.headers.set("Content-Type", "application/json");
                request.headers.set("Accept", "application/json");
                if (this.options.config.contactToken) {
                    request.headers.set(
                        "Authorization",
                        `Bearer ${this.options.config.contactToken}`,
                    );
                }
            },
        });
    }

    setUser = (user: User) => {
        this.#client = this.createClient(user)
    }

    me = async () => {
        return await this.#client.GET("/backend/widget/v2/me");
    };

    widgetPrelude = async () => {
        return await this.#client.GET("/backend/widget/v2/prelude", {
            params: { header: { "X-Bot-Token": this.options.config.token } },
        });
    };

    handleMessage = async (body: SendChatDto, abortSignal?: AbortSignal) => {
        return await this.#client.POST("/backend/widget/v2/chat/send", {
            body,
            signal: abortSignal,
        });
    };

    getSessionHistory = async (
        sessionId: string,
        lastMessageTimestamp?: string,
    ) => {
        const query = lastMessageTimestamp ? { lastMessageTimestamp } : undefined;
        return await this.#client.GET(
            "/backend/widget/v2/session/history/{sessionId}",
            { params: { path: { sessionId }, query } },
        );
    };

    createContact = async (body: Dto["CreateContactDto"]) => {
        return await this.#client.POST("/backend/widget/v2/me/create", {
            params: { header: { "x-bot-token": this.options.config.token } },
            body,
        });
    };

    createSession = async () => {
        return await this.#client.POST("/backend/widget/v2/create-session");
    };

    getSession = async (sessionId: string) => {
        return await this.#client.GET("/backend/widget/v2/session/{sessionId}", {
            params: { path: { sessionId } },
        });
    };

    uploadFile = async ({
        file,
        abortSignal,
    }: {
        file: {
            id: string;
            file: File;
        };
        abortSignal?: AbortSignal;
    }) => {
        const formData = new FormData();
        formData.append("file", file.file);

        return await this.#client.POST("/backend/widget/v2/upload", {
            params: { query: { fileId: file.id, sessionId: "" } },
            body: formData as unknown as Dto["FileUploadDto"],
            signal: abortSignal,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    };

    vote = async (body: WidgetVoteDto) => {
        return await this.#client.POST("/backend/widget/v2/chat/vote", { body });
    };
}
