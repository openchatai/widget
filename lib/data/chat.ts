import { Message } from "@lib/types";
import axios, { AxiosInstance } from "axios";

export function createAxiosInstance({
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

type HistoryMessage = {
  chatbot_id: string;
  created_at: string;
  from_user: boolean;
  id: number;
  message: string;
  session_id: string;
  updated_at: string;
};

export function historyToMessages(history?: HistoryMessage[]): Message[] {
  const $messages: Message[] = [];

  if (history) {
    history.forEach((m) => {
      if (m.from_user) {
        $messages.push({
          from: "user",
          content: m.message,
          id: m.id,
          timestamp: new Date(m.created_at),
        });
      } else {
        $messages.push({
          from: "bot",
          id: m.id,
          timestamp: new Date(m.created_at),
          type: "text",
          response: {
            text: m.message,
          },
        });
      }
    });
  }
  return $messages;
}

export type ChatSession = {
  id: string;
  copilot_id: string;
  assignee_id: number;
  channel: string;
  status: 0;
  last_message_at: string;
  last_message: "string";
  is_notification_enabled: boolean;
  handoff: boolean;
  summary: string;
  handoff_sentiment: Record<string, string>;
  email_thread_id: "string";
  meta: Record<string, string>;
  updated_at: string;
  created_at: string;
};
export interface ChatMessage {
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
  type: string | null;
  agent_name: string | null;
  agent_avatar: string | null;
}

export async function createSession(instance: AxiosInstance, botToken: string) {
  return instance.post<ChatSession>("/chat-session/" + botToken);
}
export type InitialData = {
  logo: string;
  faq: [];
  initial_questions: string[];
  history: ChatMessage[];
};

export async function getInitData(instance: AxiosInstance, sessionId?: string) {
  return instance.get<InitialData>("/chat/init", {
    headers: {
      "X-Session-Id": sessionId
    }
  });
}