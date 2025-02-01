import { useMessages } from "./useMessages";
import { useSessions } from "./useSessions";

export function useIsAwaitingBotReply() {
  const { sessionState } = useSessions();
  const { messagesState } = useMessages();

  const isAwaitingBotReply =
    (sessionState.session?.assignee.kind === "ai" ||
      sessionState.isCreatingSession) &&
    messagesState.isSendingMessage;

  return { isAwaitingBotReply };
}
