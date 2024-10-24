import { ChatHistoryMessageType } from "@lib/types/schemas";

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

export type PreludeData = {
  initial_questions: string[];
  ai_enabled: boolean,
  office_hours: WorkingHours;
  office_hours_timezone: string;
};

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
