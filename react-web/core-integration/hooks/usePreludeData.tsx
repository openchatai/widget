import useSWR from "swr";
import { useConfig } from "./useConfig";
import { useChat } from "../ChatProvider";

function usePreludeData() {
  const { api } = useChat();
  const config = useConfig();

  return useSWR([config.apiUrl], api.widgetPrelude);
}

export { usePreludeData };
