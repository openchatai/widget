import { useChat } from "../ChatProvider";
import { usePubsub } from "./usePubsub";

export function useSession() {
  const { chat } = useChat();
  const session = usePubsub(chat.sessionCtx.sessionState);

  return { session };
}
