export interface User {
    external_id?: string
    name?: string
    email?: string
    phone?: string
    customData?: Record<string, string>
    avatarUrl?: string
}

export interface CoreOptions {
    token: string
    apiUrl: string
    socketUrl: string
    headers?: Record<string, string>
    queryParams?: Record<string, string>
    pathParams?: Record<string, string>
    debug?: boolean
    language?: string
    user?: User
    bot?: {
        name?: string
        avatarUrl?: string
        id?: number | null
        is_ai?: boolean
    }
    transport?: 'http' | 'socket' | 'both'
    pollingInterval?: number
    settings?: {
        persistSession?: boolean
    }
}

export type EventCallback = (data: any) => void
export type ConnectionStatus = 'connected' | 'disconnected' | 'connecting' | 'error'

