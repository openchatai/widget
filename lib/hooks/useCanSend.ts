import { useMessageHandler } from "@lib/contexts";
import { useChatLoading } from "@lib/hooks";
import { useMemo } from "react";

export function useCanSend({ input }: { input: string }) {
  const isLoading = useChatLoading();
  const { socketState, } = useMessageHandler();
  const canSend =
    input.trim().length > 0 && !isLoading && socketState.state === "connected";

  const cantSendReason = useMemo(() => {
    if (isLoading) return "loading";
    if (socketState.state !== "connected") return "disconnected";
    return "empty";
  }, [isLoading, socketState.state]) as "loading" | "disconnected" | "empty";

  return { canSend, cantSendReason };
}
