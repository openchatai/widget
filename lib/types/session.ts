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
