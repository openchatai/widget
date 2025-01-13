import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { HandleContactMessageOutputSchema, HttpChatInputSchema, WidgetHistorySchema, WidgetPreludeSchema, WidgetSessionSchema, WidgetVoteResponseSchema, WidgetVoteSchema } from "../types/schemas-v2";
import { NormalizedConfig } from "./config";

export interface ApiCallerOptions {
    config: NormalizedConfig;
}

export class ApiCaller {
    #axios: AxiosInstance;
    constructor(private readonly options: ApiCallerOptions) {
        const user = this.options.config.user;
        const consumerHeader = {
            claim: '',
            value: ''
        }

        if (user?.email) {
            consumerHeader.claim = 'email';
            consumerHeader.value = user.email;
        }
        else if (user?.phone) {
            consumerHeader.claim = 'phone';
            consumerHeader.value = user.phone;
        }

        const headers: Record<string, string> = {
            'X-Bot-Token': this.options.config.token,
            'X-Consumer-Id': `${consumerHeader.claim}:${consumerHeader.value}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }

        if (this.options.config.contactToken) {
            headers['Authorization'] = `Bearer ${this.options.config.contactToken}`
        }

        this.#axios = axios.create({
            baseURL: `${this.options.config.apiUrl}/widget/v2`,
            headers
        });
    }

    async me(): Promise<{
        contactId: string;
        contactName: string;
    }> {
        const { data } = await this.#axios.get('/me');
        return data;
    }

    async widgetPrelude(): Promise<WidgetPreludeSchema> {
        const { data } = await this.#axios.get('/prelude');
        return data;
    }

    async handleMessage(message: HttpChatInputSchema, abortSignal?: AbortSignal) {
        const { data } = await this.#axios.post('/chat/send', message, { signal: abortSignal });
        return data as HandleContactMessageOutputSchema;
    }

    async getSessionHistory(sessionId: string, lastMessageTimestamp?: string): Promise<WidgetHistorySchema[]> {
        const params = lastMessageTimestamp ? { lastMessageTimestamp } : undefined;
        const { data } = await this.#axios.get(`/session/history/${sessionId}`, { params });
        return data;
    }

    async createSession(): Promise<WidgetSessionSchema> {
        const { data } = await this.#axios.post('/create-session');
        return data;
    }

    async getSession(sessionId: string): Promise<WidgetSessionSchema> {
        const { data } = await this.#axios.get(`/session/${sessionId}`);
        return data;
    }

    async uploadFile(
        file: {
            id: string;
            file: File;
        },
        config: Partial<AxiosRequestConfig> = {}
    ) {
        const formData = new FormData();
        formData.append("file", file.file);
        const { data } = await this.#axios.post(`/upload?fileId=${file.id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            ...config
        });
        return data as {
            fileName: string;
            fileUrl: string;
            clientFileId: string;
        };
    }

    async vote(vote: WidgetVoteSchema) {
        const { data } = await this.#axios.post<WidgetVoteResponseSchema>(`/chat/vote`, vote)
        return data
    }
}
