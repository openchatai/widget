import axios from "axios";
import { useMemo } from "react";

type Options = {
  apiUrl: string;
  botToken: string;
};

function createAxiosInstance({
  apiUrl,
  botToken,
}: {
  apiUrl: string;
  botToken: string;
}) {
  const instance = axios.create({
    baseURL: apiUrl,
    headers: {
      "X-Bot-Token": botToken,
    },
  });
  return instance;
}

export function useAxiosInstance({ apiUrl, botToken }: Options) {
  return useMemo(() => {
    return createAxiosInstance({
      botToken: botToken,
      apiUrl: apiUrl,
    });
  }, [botToken, apiUrl]);
}
