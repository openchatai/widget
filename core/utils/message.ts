import { MessageAttachmentType, SendMessageOutputDto, MessageDto } from "core";
import {
  BotMessageType,
  MessageType,
  UserMessageType,
} from "core/types/messages";
import { genUuid } from "./uuid";
import { ApiCaller } from "../api";

export class MessageUtils {
  static async fetchHistoryMessages({
    sessionId,
    api,
    prevMessages,
  }: {
    sessionId: string;
    api: ApiCaller;
    prevMessages: MessageType[];
  }): Promise<MessageType[]> {
    const lastMessageTimestamp = prevMessages.at(-1)?.timestamp;

    const { data: response } = await api.getSessionHistory(
      sessionId,
      lastMessageTimestamp,
    );

    if (response && response.length > 0) {
      const newMessages = response
        .map(this.mapHistoryToMessage)
        .filter(
          (newMsg) =>
            !prevMessages.some((existingMsg) => existingMsg.id === newMsg.id),
        );
      return newMessages;

      // if (newMessages.length > 0) {
      //   // const playSoundEffects = config?.settings?.playSoundEffects;
      //   // Play notification sound for new messages if enabled
      //   // if (
      //   //   playSoundEffects &&
      //   //   platform?.audio &&
      //   //   isAudioAvailable(platform.audio)
      //   // ) {
      //   //   const botMessages = newMessages.filter(
      //   //     (msg) => msg.type === "FROM_BOT",
      //   //   );
      //   //   if (botMessages.length > 0) {
      //   //     await safeAudioOperation(
      //   //       () => platform.audio!.playNotification(),
      //   //       "Failed to play notification sound for new messages",
      //   //     );
      //   //   }
      //   // }

      // }
    }

    return [];
  }

  /** Not the best name but whatever */
  static mapHistoryToMessage(history: MessageDto): MessageType {
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

  static toUserMessage(
    content: string,
    attachments?: MessageAttachmentType[],
  ): UserMessageType {
    return {
      id: genUuid(),
      type: "FROM_USER",
      content,
      deliveredAt: new Date().toISOString(),
      attachments,
      timestamp: new Date().toISOString(),
    };
  }

  static toBotMessage(response: SendMessageOutputDto): BotMessageType | null {
    if (response.success && response.autopilotResponse) {
      return {
        type: "FROM_BOT",
        id: response.autopilotResponse.id || genUuid(),
        timestamp: new Date().toISOString(),
        component: "bot_message",
        data: {
          message: response.autopilotResponse.value.content,
        },
      };
    }

    if (response.success && response.uiResponse) {
      const uiVal = response.uiResponse.value;
      return {
        type: "FROM_BOT" as const,
        id: genUuid(),
        timestamp: new Date().toISOString(),
        component: uiVal.name,
        data: uiVal.request_response,
      };
    }

    return null;
  }

  static toErrorMessage(message: string) {
    return {
      type: "FROM_BOT" as const,
      id: genUuid(),
      timestamp: new Date().toISOString(),
      component: "TEXT",
      data: {
        message,
        variant: "error",
      },
    };
  }
}
