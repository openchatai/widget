import { createFetch, CustomFetch } from "../utils/create-fetch";
import { MessageData } from "../types/transport";
import { HandleContactMessageOutputSchema, WidgetHistorySchema, WidgetPreludeSchema, WidgetSessionSchema } from "../types/schemas-v2";
import { CoreOptions } from "../types";

export interface ApiCallerOptions {
    apiUrl: string;
    token: string;
    coreOptions: CoreOptions;
}

export class ApiCaller {
    #fetch: CustomFetch
    constructor(private readonly options: ApiCallerOptions) {
        const user = this.options.coreOptions.user;
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
            'X-Bot-Token': this.options.token,
            'X-Consumer-Id': `${consumerHeader.claim}:${consumerHeader.value}`
        }

        // Only add Authorization header if contactToken exists
        if (this.options.coreOptions.contactToken) {
            headers['Authorization'] = `Bearer ${this.options.coreOptions.contactToken}`
        }

        this.#fetch = createFetch({
            baseURL: `${this.options.apiUrl}/widget/v2`,
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

    async handleMessage(message: MessageData): Promise<HandleContactMessageOutputSchema> {
        // POST /chat/send
        const response = await this.#fetch('/chat/send', {
            method: "POST",
            body: JSON.stringify(message)
        })
        return response.json()
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