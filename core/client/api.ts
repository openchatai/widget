import axios, { AxiosInstance } from "axios"
import { User } from "../types"
import { AuthenticationError, FileUploadError, SessionError } from "../errors"
import { PreludeData, WorkingHours } from "../types/prelude"
import { ChatHistoryMessageType, ChatSessionType, ConsumerType } from "../types/schemas"
import { mapChatHistoryToMessage } from "../utils/history-to-widget-messages"

export class ApiCaller {
    private _http: AxiosInstance

    constructor(
        private readonly options: {
            apiUrl: string,
            token: string,
        }) {
        this._http = axios.create({
            baseURL: options.apiUrl,
            headers: {
                "X-Bot-Token": options.token,
            },
        })

        this.http.interceptors.response.use(
            response => response,
            error => {
                if (error.response?.status === 401) {
                    throw new AuthenticationError(error.message)
                }
                throw error
            }
        )
    }

    get http() {
        return this._http
    }

    async createSession() {
        try {
            const response = await this.http.post<ChatSessionType>(`/chat-session/${this.options.token}`)
            return response.data
        } catch {
            throw new SessionError('Failed to create session')
        }
    }

    async fetchSession(sessionId: string) {
        if (!sessionId) throw new SessionError('Session ID is required')
        const response = await this.http.get<ChatSessionType>(`widget/session/${sessionId}`)
        return response.data
    }

    async fetchPreludeData() {
        const response = await this.http.get<PreludeData>("/widget/prelude")
        return response.data
    }

    async getOfficeHours(): Promise<WorkingHours> {
        const response = await this.http.get<WorkingHours>("/copilot/office-hours/public")
        return response.data
    }

    async fetchHistory(sessionId: string) {
        if (!sessionId) throw new SessionError('Session ID is required')
        const response = await this.http.get<ChatHistoryMessageType[]>(
            `widget/session/history/${sessionId}`
        )
        if (Array.isArray(response.data)) {
            return mapChatHistoryToMessage(response.data)
        }
        return []
    }

    async downvote(id: string): Promise<{ message: string }> {
        return (await this.http.delete<{ message: string }>(`/chat/vote/${id}`)).data
    }

    async upvote(id: string): Promise<{ message: string }> {
        return (await this.http.post<{ message: string }>(`/chat/vote/${id}`)).data
    }

    async dumpContact(userData: User): Promise<ConsumerType> {
        return (await this.http.post<ConsumerType>("/widget/contact/upsert", userData)).data
    }

    async getCompletions(input: string): Promise<string[]> {
        const response = await this.http.post<{ completions: string[] }>(
            `/widget/chat/completions`,
            { input }
        )
        return response.data.completions
    }

    async uploadFile(file: File): Promise<string> {
        try {
            const formData = new FormData()
            formData.append("file", file)
            const response = await this.http.post<{ fileUrl: string }>(
                `/widget/upload`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            )
            return response.data.fileUrl
        } catch {
            throw new FileUploadError('Failed to upload file')
        }
    }

    async getHistoryPooling(params: { lastMessageTimestamp: string, sessionId: string }) {
        const searchParams = new URLSearchParams()
        searchParams.append("lastMessageTimestamp", params.lastMessageTimestamp)
        const response = await this.http.get<ChatHistoryMessageType[]>(
            `/widget/session/history/${params.sessionId}/?${searchParams.toString()}`
        )
        return {
            data: mapChatHistoryToMessage(response.data)
        }
    }
} 