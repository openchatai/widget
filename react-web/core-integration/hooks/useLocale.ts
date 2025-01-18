import { useChat } from "../ChatProvider";

export function useLocale() {
  const { locale } = useChat();
  return locale;
}
