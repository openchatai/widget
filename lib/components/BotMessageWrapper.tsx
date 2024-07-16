import { useChatState } from "@lib/hooks";
import { useConfigData } from "@lib/contexts";
import { BotIcon } from "@lib/components";

export function BotMessageWrapper({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string | number;
}) {
  const { messages } = useChatState();
  const config = useConfigData();

  return (
    <div className="px-2 group w-full shrink-0">
      <div className="flex flex-col gap-1 w-full" dir="auto">
        <div className="flex items-center gap-1">
          <BotIcon />
          <span className="text-tiny">{config?.bot?.name ?? "Bot"}</span>
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
