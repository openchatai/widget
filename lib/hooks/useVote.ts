import { useAsyncFn } from "./useAsyncFn";
import { useConfigData } from "@lib/providers";

export function useUpvote(id: string, onSuccess?: () => void) {
  const { http } = useConfigData();
  return useAsyncFn(
    async () => http.apis.upvote(id).then(onSuccess),
    [http.options, id, onSuccess]
  );
}

export function useDownvote(id: string, onSuccess?: () => void) {
  const { http } = useConfigData();
  return useAsyncFn(
    async () => http.apis.downvote(id).then(onSuccess),
    [http.options, id]
  );
}
