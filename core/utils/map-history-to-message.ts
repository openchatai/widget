import { WidgetHistoryDto } from "core";
import { MessageType } from "core/types/messages";

export function mapHistoryToMessage(history: WidgetHistoryDto): MessageType {
  const commonFields = {
    id: history.publicId,
    timestamp: history.sentAt || "",
    attachments: history.attachments || undefined,
  };

  if (history.sender.kind === "user") {
    return {
      ...commonFields,
      type: "FROM_USER",
      content: history.content.text || "",
      deliveredAt: history.sentAt || "",
    };
  }

  if (history.sender.kind === "agent") {
    return {
      ...commonFields,
      type: "FROM_AGENT",
      component: "agent_message",
      data: {
        message: history.content.text || "",
      },
    };
  }

  return {
    ...commonFields,
    type: "FROM_BOT",
    component: "bot_message",
    agent: {
      id: null,
      name: history.sender.name || "",
      isAi: history.sender.kind === "ai",
      avatar: history.sender.avatar || null,
    },
    data: {
      message: history.content.text,
    },
  };
}
