import useAsyncFn from "react-use/lib/useAsyncFn";
import { useChat } from "../ChatProvider";

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
        return api
          .vote({ action: "upvote", messagePublicId: id, sessionId })
          .then(onSuccess);
      } else {
        return api
          .vote({ action: "downvote", messagePublicId: id, sessionId })
          .then(onSuccess);
      }
    },
    [api, id, sessionId, onSuccess],
  );
}

/**
 * @param id
 * @param onSuccess
 * @deprecated use useVote instead
 */
export function useUpvote(
  id: string,
  sessionId: string,
  onSuccess?: () => void,
) {
  const { api } = useChat();
  return useAsyncFn(
    async () =>
      api
        .vote({ action: "upvote", messagePublicId: id, sessionId })
        .then(onSuccess),
    [api, id, sessionId, onSuccess],
  );
}

/**
 * @param id
 * @param onSuccess
 * @deprecated use useVote instead
 */
export function useDownvote(
  id: string,
  sessionId: string,
  onSuccess?: () => void,
) {
  const { api } = useChat();
  return useAsyncFn(
    async () =>
      api
        .vote({ action: "downvote", messagePublicId: id, sessionId })
        .then(onSuccess),
    [api, id, sessionId, onSuccess],
  );
}
