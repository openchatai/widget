import { useMessages } from "./useMessages";
import { useSession } from "./useSession";

export function useIsAwaitingBotReply() {
  const { sessionState } = useSession();
  const { messagesState } = useMessages();

  const isAwaitingBotReply =
    (!sessionState.session?.isHandedOff ||
      sessionState.session.assignee.kind === "ai" ||
      sessionState.isCreatingSession) &&
    messagesState.isSendingMessage;

  return { isAwaitingBotReply };
}
