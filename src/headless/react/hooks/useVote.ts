import useAsyncFn from "react-use/lib/useAsyncFn";
import { useWidget } from "../WidgetProvider";

/**
 * @param id
 * @param onSuccess
 * @returns
 */
export function useVote(id: string, sessionId: string, onSuccess?: () => void) {
  const {
    widgetCtx: { api },
  } = useWidget();
  return useAsyncFn(
    async (action: "up" | "down") => {
      return api
        .vote({
          action: action === "up" ? "upvote" : "downvote",
          messagePublicId: id,
          sessionId,
        })
        .then(onSuccess);
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
  const {
    widgetCtx: { api },
  } = useWidget();
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
  const {
    widgetCtx: { api },
  } = useWidget();
  return useAsyncFn(
    async () =>
      api
        .vote({ action: "downvote", messagePublicId: id, sessionId })
        .then(onSuccess),
    [api, id, sessionId, onSuccess],
  );
}
