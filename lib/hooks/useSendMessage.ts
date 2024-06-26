import {
  useAxiosInstance,
  useConfigData,
  useLang,
  useMessageHandler,
  useSocket,
} from "@lib/contexts";
import { useChatState } from ".";
import { createSession } from "@lib/data";

export function useSendMessage() {
  const { __handler, chatSession, setChatSession } = useMessageHandler();
  const { headers, token, queryParams, user } = useConfigData();
  const { lang } = useLang();
  const socket = useSocket();
  const { messages } = useChatState();
  const { axiosInstance } = useAxiosInstance();

  async function send(content: string) {
    let session = chatSession;
    if (messages.length === 0 || !session) {
      const { data } = await createSession(axiosInstance, token);
      session = data;
      setChatSession(data);

      socket.__socket?.emit("join_session", {
        "session_id": session.id
      })
    }
    if (!session) {
      throw new Error("No session found");
    }
    __handler.handleTextMessage(
      {
        headers: headers ?? {},
        query_params: queryParams ?? {},
        content,
        bot_token: token,
        language: lang,
        user: user,
      },
      socket.__socket,
      session?.id
    );
  }

  return {
    send,
  };
}
