import { useEffect, useRef } from "react"
import { ApiClient, CoreOptions } from "@core/index";

export const useBaseClient = (options: CoreOptions) => {
    const client = useRef<ApiClient | null>(null)

    useEffect(() => {
        if (client.current) return
        client.current = new ApiClient(options)
    }, [])

    return client.current
}