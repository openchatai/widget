import { createFetch, CustomFetch } from "../utils/create-fetch";
import { HandleContactMessageOutputSchema, HttpChatInputSchema, WidgetHistorySchema, WidgetPreludeSchema, WidgetSessionSchema } from "../types/schemas-v2";
import { NormalizedConfig } from "./config";
import { ConsumerType } from "@core/types/schemas";

export interface ApiCallerOptions {
    config: NormalizedConfig;
}

export class ApiCaller {
    #fetch: CustomFetch
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

        // Only add Authorization header if contactToken exists
        if (this.options.config.contactToken) {
            headers['Authorization'] = `Bearer ${this.options.config.contactToken}`
        }

        this.#fetch = createFetch({
            baseURL: `${this.options.config.apiUrl}/widget/v2`,
            headers
        })
    }

    async me(): Promise<{
        contactId: string;
        contactName: string;
    }> {
        // GET /me
        const response = await this.#fetch('/me')
        return response.json()
    }

    async widgetPrelude(): Promise<WidgetPreludeSchema> {
        // GET /prelude
        const response = await this.#fetch('/prelude')
        return response.json()
    }

    async handleMessage(message: HttpChatInputSchema) {
        // POST /chat/send
        const response = await this.#fetch('/chat/send', {
            method: "POST",
            body: JSON.stringify(message)
        })
        return response.json() as Promise<HandleContactMessageOutputSchema>
    }

    async getSessionHistory(sessionId: string, lastMessageTimestamp?: string): Promise<WidgetHistorySchema[]> {
        // session/history/:sessionId
        const queryParams = new URLSearchParams({
            lastMessageTimestamp: lastMessageTimestamp || ''
        })

        const url = `/session/history/${sessionId}?${queryParams.toString()}`

        const response = await this.#fetch(url, {
            method: 'GET'
        })

        return response.json()
    }

    async createSession(): Promise<WidgetSessionSchema> {
        // POST /create-session
        const response = await this.#fetch('/create-session', {
            method: 'POST'
        })
        return response.json()
    }

    async getSession(sessionId: string): Promise<WidgetSessionSchema> {
        // GET /session/:sessionId
        const response = await this.#fetch(`/session/${sessionId}`, {
            method: 'GET'
        })
        return response.json()
    }
}
