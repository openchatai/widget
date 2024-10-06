import { ChatHistoryMessageType, ChatSessionType } from "@lib/types/schemas.backend";
import { AxiosInstance } from "axios";

export async function createSession(instance: AxiosInstance, botToken: string) {
  return instance.post<ChatSessionType>("/chat-session/" + botToken);
}


interface DayOfficeHours {
  from: string;
  to: string;
}

export const workingDays = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
  "WeekDays",
  "Everyday",
] as const;

type Day = typeof workingDays[number];

export type WorkingHours = {
  [K in Day]: DayOfficeHours;
};

export type InitialData = {
  logo: string;
  faq: [];
  initial_questions: string[];
  history: ChatHistoryMessageType[];
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
  return instance.get<ChatSessionType>("/chat-session/one/" + sessionId);
}

export async function getOfficeHours(instance: AxiosInstance) {
  return instance.get<WorkingHours>("/copilot/office-hours/public");
}