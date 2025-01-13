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

    me = async () => {
        const { data } = await this.#axios.get<{
            contactId: string;
            contactName: string;
        }>('/me');
        return data;
    }

    widgetPrelude = async () => {
        const { data } = await this.#axios.get<WidgetPreludeSchema>('/prelude');
        return data;
    }

    handleMessage = async (message: HttpChatInputSchema, abortSignal?: AbortSignal) => {
        const { data } = await this.#axios.post<HandleContactMessageOutputSchema>('/chat/send', message, { signal: abortSignal });
        return data
    }

    getSessionHistory = async (sessionId: string, lastMessageTimestamp?: string) => {
        const params = lastMessageTimestamp ? { lastMessageTimestamp } : undefined;
        const { data } = await this.#axios.get<WidgetHistorySchema[]>(`/session/history/${sessionId}`, { params });
        return data;
    }

    createSession = async () => {
        const { data } = await this.#axios.post<WidgetSessionSchema>('/create-session');
        return data;
    }

    getSession = async (sessionId: string) => {
        const { data } = await this.#axios.get<WidgetSessionSchema>(`/session/${sessionId}`);
        return data;
    }

    uploadFile = async (
        file: {
            id: string;
            file: File;
        },
        config: Partial<AxiosRequestConfig> = {}
    ) => {
        const formData = new FormData();
        formData.append("file", file.file);
        const { data } = await this.#axios.post<{
            fileName: string;
            fileUrl: string;
            clientFileId: string;
        }>(`/upload?fileId=${file.id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            ...config
        });
        return data
    }

    vote = async (vote: WidgetVoteSchema) => {
        const { data } = await this.#axios.post<WidgetVoteResponseSchema>(`/chat/vote`, vote)
        return data
    }
}
