import { UserAvatar } from "@lib/components";
import { formatTimeFromTimestamp } from "@lib/utils/time";

export function UserMessage({
  content,
  timestamp,
}: {
  content: string;
  timestamp?: number | Date;
  id?: string | number;
}) {
  return (
    <div
      dir="auto"
      className="w-full overflow-x-auto shrink-0 max-w-full last-of-type:mb-10 px-3 flex justify-end flex-col gap-1 items-end"
    >
      <UserAvatar />
      <div>
        <p className="prose prose-slate font-medium text-sm prose-sm bg-accent rounded-lg px-3 py-2 w-fit max-w-[80%]">
          {content}
        </p>
        <span>{timestamp && formatTimeFromTimestamp(timestamp)}</span>
      </div>
    </div>
  );
}
