import React, { useState } from "react";
import { Button } from "./lib/button";
import { ThumbsDown, ThumbsUp, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useVote } from "../../../headless/react";
import { cn } from "./lib/utils/cn";

interface VoteButtonsProps {
  messageId: string;
  sessionId: string;
  className?: string;
}

export function VoteButtons({
  messageId,
  sessionId,
  className,
}: VoteButtonsProps) {
  const [voteState, voteAction] = useVote(messageId, sessionId);
  const [selectedVote, setSelectedVote] = useState<"up" | "down" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleVote = async (action: "up" | "down") => {
    setError(null);
    try {
      await voteAction(action);
      setSelectedVote(action);
    } catch {
      setError("Failed to submit feedback");
    }
  };

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={cn(
          "flex items-center gap-1 text-destructive text-xs",
          className,
        )}
      >
        <AlertCircle className="size-3" />
        <span>{error}</span>
        <Button
          variant="ghost"
          size="fit"
          className="text-xs hover:text-primary"
          onClick={() => setError(null)}
        >
          Try again
        </Button>
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {!selectedVote ? (
        <motion.div
          className={cn("flex gap-0.5", className)}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <Button
            variant="ghost"
            size="fit"
            className={cn(
              "rounded-full transition-all hover:text-green-500 hover:bg-green-50/50",
              voteState.loading && "opacity-50 cursor-not-allowed",
            )}
            disabled={voteState.loading}
            onClick={() => handleVote("up")}
          >
            <ThumbsUp className="size-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="fit"
            className={cn(
              "rounded-full transition-all hover:text-red-500 hover:bg-red-50/50",
              voteState.loading && "opacity-50 cursor-not-allowed",
            )}
            disabled={voteState.loading}
            onClick={() => handleVote("down")}
          >
            <ThumbsDown className="size-3.5" />
          </Button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={cn(
            "text-sm text-muted-foreground flex items-center gap-2",
            className,
          )}
        >
          {selectedVote === "up" ? (
            <ThumbsUp className="size-3 text-green-500" />
          ) : (
            <ThumbsDown className="size-3 text-red-500" />
          )}
          <span className="text-xs">
            {selectedVote === "up"
              ? "Feedback received, thank you!"
              : "We'll work on improving"}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
