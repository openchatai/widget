import { useAxiosInstance } from "@lib/hooks";
import useSWR from "swr";
import { useConfigData } from "./ConfigDataProvider";

function usePreludeData() {
    const { apiUrl, botToken } = useConfigData()
    const http = useAxiosInstance({
        apiUrl,
        botToken,
    });
    return useSWR(http.options, http.apis.fetchPreludeData)
}

export { usePreludeData }