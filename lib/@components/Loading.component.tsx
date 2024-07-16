import { BotMessageWrapper } from "@lib/components";
import { useChatState } from "@lib/hooks";

/**
 * The Basic Loading component
 */
export function Loading() {
  const { conversationInfo } = useChatState();

  if (!conversationInfo) return null;

  return (
    <BotMessageWrapper id="">
      <div className="flex-1">
        <div className="w-fit">
          <div dir="auto" className="text-ellipsis text-xs">
            {conversationInfo}
          </div>
        </div>
      </div>
    </BotMessageWrapper>
  );
}
