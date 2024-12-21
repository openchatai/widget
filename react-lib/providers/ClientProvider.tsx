import { ApiClient } from "@core/client"
import { createSafeContext } from "@react/utils/create-safe-context"
import React from "react"
import { useConfigData } from "./ConfigDataProvider"
import { useBaseClient } from "@react/hooks/useBaseClient"

const [useClient, SafeClientProvider] = createSafeContext<ApiClient>()

function ClientProvider({ children }: { children: React.ReactNode }) {
    const config = useConfigData()
    const client = useBaseClient({ token: config.token })
    if (!client) return null
    return <SafeClientProvider value={client}>{children}</SafeClientProvider>
}

export { useClient, ClientProvider }
