import { useLang } from "@lib/contexts";
import { useDownvote, useUpvote } from "@lib/hooks";
import cn from "@lib/utils/cn";
import { ThumbsDown, ThumbsUp } from "lucide-react";

const SIZE = 18;

export function Vote({ serverMessageId }: { serverMessageId: string }) {
  const [asyncUpvoteState, asyncUpvote] = useUpvote(serverMessageId);
  const [asyncDownvoteState, asyncDownvote] = useDownvote(serverMessageId);
  const isUpvoted = !!asyncUpvoteState.value?.data.message;
  const isDownvoted = !!asyncDownvoteState.value?.data.message;
  const userVoted = isUpvoted || isDownvoted;

  const { get } = useLang();

  return (
    <div className="flex items-center justify-end gap-px [&>button]:p-1">
      {userVoted ? (
        <span className="text-xs text-blur-out text-emerald-500">
          {get("thank-you")}
        </span>
      ) : (
        <>
          <button
            onClick={asyncUpvote}
            className={cn(
              "transition-all rounded-lg",
              isUpvoted ? "*:fill-emerald-500" : "active:*:scale-105"
            )}
          >
            <ThumbsUp
              size={SIZE}
              className="transition-all stroke-emerald-500"
            />
          </button>
          <button
            onClick={asyncDownvote}
            className={cn(
              "transition-all rounded-lg",
              isDownvoted ? "*:fill-rose-500" : "active:*:scale-105"
            )}
          >
            <ThumbsDown
              size={SIZE}
              className="transition-all stroke-rose-500"
            />
          </button>
        </>
      )}
    </div>
  );
}
