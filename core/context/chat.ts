import { WidgetConfig } from "core/types/WidgetConfig";
import { MessageUtils } from "core/utils/message";
import { PubSub } from "../PubSub";
import { ApiCaller } from "../api";
import { MessageType } from "../types";
import {
  ErrorState,
  LoadingState,
  SafeOmit,
  SomeOptional,
} from "../types/helpers";
import { SendMessageDto, SessionDto } from "../types/schemas";
import { ContactCtx } from "./contact";
import { SessionCtx } from "./session";

// Constants
export const POLLING_INTERVALS_MS = {
  SESSION: 1000,
  MESSAGES: 1000,
} as const;

// Types
export type PollingType = "session" | "messages";

export type PollingState = {
  isPolling: boolean;
  lastPollTime: string | null;
  nextPollTime: string | null;
  error: ErrorState;
};

export type PollingStates = {
  [K in PollingType]: PollingState;
};

export type ChatState = {
  messages: MessageType[];
  keyboard: { options: string[] } | null;
  loading: LoadingState;
  error: ErrorState;
  polling: PollingStates;
};

export type SendMessageInput = SomeOptional<
  SafeOmit<SendMessageDto, "bot_token" | "uuid">,
  "session_id" | "user"
>;

export function createChat(options: {
  api: ApiCaller;
  config: WidgetConfig;
}) {
  const chatState = new PubSub<ChatState>({
    messages: [],
    keyboard: null,
    loading: { isLoading: false, reason: null },
    error: { hasError: false },
    polling: {
      session: {
        isPolling: false,
        lastPollTime: null,
        nextPollTime: null,
        error: { hasError: false },
      },
      messages: {
        isPolling: false,
        lastPollTime: null,
        nextPollTime: null,
        error: { hasError: false },
      },
    },
  });

  const contactCtx = new ContactCtx({
    config: options.config,
    api: options.api,
  });

  const sessionCtx = new SessionCtx({
    api: options.api,
    chatState,
  });

  async function sendMessage(input: SendMessageInput, abort?: AbortSignal) {
    let session = sessionCtx.sessionState.getState();
    let createdSession = false;

    if (!session?.id) {
      session = await sessionCtx.createSession();
      if (!session)
        return {
          success: false,
          createdSession,
        };
      createdSession = true;
    }

    if (session.assignee.kind === "ai") {
      session = (await sessionCtx.refetch()) ?? session;
    }

    try {
      if (session.assignee.kind === "ai") {
        chatState.setStatePartial({
          loading: { isLoading: true, reason: "sending_message_to_bot" },
          error: { hasError: false },
        });
      } else {
        chatState.setStatePartial({
          loading: { isLoading: true, reason: "sending_message_to_agent" },
          error: { hasError: false },
        });
      }

      const userMessage = MessageUtils.toUserMessage(
        input.content,
        input.attachments || undefined,
      );
      const currentMessages = chatState.getState().messages;
      chatState.setStatePartial({
        messages: [...currentMessages, userMessage],
      });

      const config = options.config;
      const { data } = await options.api.handleMessage(
        {
          uuid: userMessage.id,
          bot_token: config.token,
          headers: config.headers,
          query_params: config.queryParams,
          session_id: session.id,
          user: config.user,
          ...input,
        },
        abort,
      );

      if (data?.success) {
        const botMessage = MessageUtils.toBotMessage(data);
        if (botMessage) {
          const updatedMessages = chatState.getState().messages;
          chatState.setStatePartial({
            messages: [...updatedMessages, botMessage],
          });
        }
        return {
          success: true,
          createdSession,
          botMessage,
        };
      } else {
        const errorMessage = MessageUtils.toErrorMessage(
          data?.error?.message || "Unknown error occurred",
        );
        const currentMessages = chatState.getState().messages;
        chatState.setStatePartial({
          messages: [...currentMessages, errorMessage],
        });
        return {
          success: false,
          createdSession,
          error: data?.error,
        };
      }
    } catch (error) {
      chatState.setStatePartial({
        error: {
          hasError: true,
          message:
            error instanceof Error ? error.message : "Failed to send message",
          code: "MESSAGE_SEND_FAILED",
        },
      });
      return {
        success: false,
        createdSession,
        error,
      };
    } finally {
      chatState.setStatePartial({
        loading: { isLoading: false, reason: null },
      });
    }
  }

  return {
    chatState,
    sessionCtx,
    contactCtx,
    sendMessage,
  };
}
