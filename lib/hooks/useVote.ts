import { useChat } from "@lib/providers/ChatProvider";
import { useAsyncFn } from "./useAsyncFn";

export function useUpvote(id: string, onSuccess?: () => void) {
  const { axiosInstance } = useChat();
  return useAsyncFn(
    async () =>
      axiosInstance.post<{
        message: string;
      }>(`/chat/vote/${id}`),
    [axiosInstance, id, onSuccess],
  );
}

export function useDownvote(id: string, onSuccess?: () => void) {
  const { axiosInstance } = useChat();
  return useAsyncFn(
    async () =>
      axiosInstance.delete<{
        message: string;
      }>(`/chat/vote/${id}`),
    [axiosInstance, id, onSuccess],
  );
}
