import { isEmpty } from "@lib/utils/utils.ts";
import { BotMessageWrapper } from "@lib/components";

export function InitialBotMessage({ message }: { message: string }) {
  if (isEmpty(message)) return null;

  return (
    <BotMessageWrapper id={""}>
      <div className="flex-1">
        <div className="w-fit">
          <div dir="auto" className="text-sm px-2 py-1">{message}</div>
        </div>
      </div>
    </BotMessageWrapper>
  );
}
