import { ChatSession } from "@lib/types";
import { AxiosInstance } from "axios";

export async function createSession(instance: AxiosInstance, botToken: string) {
  return instance.post<ChatSession>("/chat-session/" + botToken);
}
export interface ChatMessageHistory {
  id: number;
  chatbot_id: string | null;
  session_id: string | null;
  from_user: boolean | null;
  message: string | null;
  created_at: string | null;
  updated_at: string | null;
  debug_json: string | null;
  api_called: boolean | null;
  knowledgebase_called: boolean | null;
  extra_params: object | null;
  type: "message" | null;
  agent_name: string | null;
  agent_avatar: string | null;
}

export type InitialData = {
  logo: string;
  faq: [];
  initial_questions: string[];
  history: ChatMessageHistory[];
};

export async function getInitData(instance: AxiosInstance, sessionId?: string) {
  return instance.get<InitialData>("/chat/init", {
    headers: {
      "X-Session-Id": sessionId,
    },
  });
}

export async function getChatSessionById(
  instance: AxiosInstance,
  sessionId: string,
) {
  return instance.get<ChatSession>("/chat-session/one/" + sessionId);
}