import useAsyncFn from "react-use/lib/useAsyncFn";
import { useChat } from "../ChatProvider";
import { useChatSession } from "./useChatSession";

/**
 * @param id 
 * @param onSuccess 
 * @returns 
 */
export function useVote(id: string, sessionId: string, onSuccess?: () => void) {
  const { api } = useChat();
  return useAsyncFn(
    async (action: "up" | "down") => {
      if (action === "up") {
        return api.vote({ action: "upvote", messagePublicId: id, sessionId }).then(onSuccess);
      } else {
        return api.vote({ action: "downvote", messagePublicId: id, sessionId }).then(onSuccess);
      }
    },
    [api, id, onSuccess],
  );
}

/**
 * @param id 
 * @param onSuccess 
 * @deprecated use useVote instead
*/
export function useUpvote(id: string, onSuccess?: () => void) {
  const { api } = useChat();
  const { chatSession } = useChatSession()
  return useAsyncFn(
    async () => api.vote({ action: "upvote", messagePublicId: id, sessionId: chatSession?.id }).then(onSuccess),
    [api, id, onSuccess],
  );
}

/**
 * @param id 
 * @param onSuccess 
 * @deprecated use useVote instead
*/
export function useDownvote(id: string, onSuccess?: () => void) {
  const { api } = useChat();
  const { chatSession } = useChatSession()
  return useAsyncFn(
    async () => api.vote({ action: "downvote", messagePublicId: id, sessionId: chatSession?.id }).then(onSuccess),
    [api, id, onSuccess],
  );
}
