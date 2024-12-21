import { ApiClient } from "@core/client"
import { createSafeContext } from "@react/utils/create-safe-context"
import React, { useMemo } from "react"
import { useConfigData } from "./ConfigDataProvider"

const [useClient, SafeClientProvider] = createSafeContext<ApiClient>()

function ClientProvider({ children }: { children: React.ReactNode }) {
    const config = useConfigData()
    const client = useMemo(() => new ApiClient({ token: config.token }), [config])
    return <SafeClientProvider value={client}>{children}</SafeClientProvider>
}

export { useClient, ClientProvider }
