import { useChat } from "../ChatProvider";
import { usePubsub } from "./usePubsub";

export function useContact() {
  const { chat } = useChat();
  const state = usePubsub(chat.contactCtx.state);

  return {
    state,
    contactCtx: chat.contactCtx,
  };
}
