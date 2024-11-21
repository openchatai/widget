import { useConfigData } from "../providers/ConfigDataProvider";
import useAsyncFn from "react-use/lib/useAsyncFn";


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
