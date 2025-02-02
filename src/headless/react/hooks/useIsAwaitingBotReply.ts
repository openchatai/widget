import { useMessages } from "./useMessages";
import { useSessions } from "./useSessions";

export function useIsAwaitingBotReply() {
  const { sessionState } = useSessions();
  const { messagesState } = useMessages();

  const isSessionAssignedToAI = sessionState.session?.assignee.kind === "ai";
  // This check is useful in cases where the user might navigate in and out of a chat, and `isSendingMessage` is reset back to its default value
  const isLastMessageAUserMessage =
    messagesState.messages.at(-1)?.type === "FROM_USER";

  const isAwaitingBotReply =
    (isSessionAssignedToAI || sessionState.isCreatingSession) &&
    (messagesState.isSendingMessage || isLastMessageAUserMessage);

  return { isAwaitingBotReply };
}
