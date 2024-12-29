import { createFetch, CustomFetch } from "@core/utils/create-fetch";
import { MessageData } from "../types/transport"
import { HandleContactMessageOutputSchema, WidgetHistorySchema, WidgetPreludeSchema, WidgetSessionSchema } from "@core/types/schemas-v2";

export interface ApiCallerOptions {
    apiUrl: string;
    token: string;
    contactToken?: string;
    contactId?: string;
}


export class ApiCaller {
    #fetch: CustomFetch
    constructor(private readonly options: ApiCallerOptions) {
        this.#fetch = createFetch({
            baseURL: `${this.options.apiUrl}/widget/v2`,
            headers: {
                'Authorization': `Bearer ${this.options.contactToken}`,
                'X-Bot-Token': this.options.token,
                'X-Consumer-Id': this.options.contactId || ''
            }
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