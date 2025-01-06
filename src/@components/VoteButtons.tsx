import React from "react";
import { useVote } from "@react/hooks/useVote";
import { Button } from "src/components/button";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { cn } from "src/utils";

interface VoteButtonsProps {
    messageId: string;
    sessionId: string;
    className?: string;
}

export function VoteButtons({ messageId, sessionId, className }: VoteButtonsProps) {
    const [voteState, voteAction] = useVote(messageId, sessionId);

    return (
        <div className={cn("flex gap-2", className)}>
            <Button
                variant="ghost"
                size="fit"
                className="rounded-full"
                disabled={voteState.loading}
                onClick={() => voteAction("up")}
            >
                <ThumbsUp className="size-4" />
            </Button>
            <Button
                variant="ghost"
                size="fit"
                className="rounded-full"
                disabled={voteState.loading}
                onClick={() => voteAction("down")}
            >
                <ThumbsDown className="size-4" />
            </Button>
        </div>
    );
} 