import { useMessages } from "./useMessages";
import { useSession } from "./useSession";

export function useIsAwaitingBotReply() {
  const { session } = useSession();
  const { messages } = useMessages();

  const isAwaitingBotReply =
    (!session.session?.isHandedOff ||
      session.session.assignee.kind === "ai" ||
      session.isCreatingSession) &&
    messages.isSendingMessage;

  return { isAwaitingBotReply };
}
