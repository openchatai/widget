import { useConfigData } from "@react/providers/ConfigDataProvider";
import useAsyncFn from "react-use/lib/useAsyncFn";

/**
 * @param id 
 * @param onSuccess 
 * @returns 
 */
export function useVote(id: string, sessionId: string, onSuccess?: () => void) {
  const { http } = useConfigData();
  return useAsyncFn(
    async (action: "up" | "down") => {
      if (action === "up") {
        return http.apis.vote({ action: "upvote", messagePublicId: id, sessionId }).then(onSuccess);
      } else {
        return http.apis.vote({ action: "downvote", messagePublicId: id, sessionId }).then(onSuccess);
      }
    },
    [http.apis, id, onSuccess],
  );
}

/**
 * @param id 
 * @param onSuccess 
 * @deprecated use useVote instead
*/
export function useUpvote(id: string, onSuccess?: () => void) {
  const { http } = useConfigData();
  return useAsyncFn(
    async () => http.apis.upvote(id).then(onSuccess),
    [http.options, id, onSuccess],
  );
}

/**
 * @param id 
 * @param onSuccess 
 * @deprecated use useVote instead
*/
export function useDownvote(id: string, onSuccess?: () => void) {
  const { http } = useConfigData();
  return useAsyncFn(
    async () => http.apis.downvote(id).then(onSuccess),
    [http.options, id],
  );
}
