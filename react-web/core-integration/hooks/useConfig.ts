import { useChat } from "../ChatProvider";

export function useConfig() {
  const { config } = useChat();
  return config;
}
