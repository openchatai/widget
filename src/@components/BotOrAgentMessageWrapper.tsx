import React from "react";
import { cn } from "src/utils";
import { AgentType } from "@core/types/messages";

export function BotOrAgentMessageWrapper({
  children,
  agent,
  className,
  messageId,
  sessionId,
}: {
  children: React.ReactNode;
  agent: AgentType;
  className?: string;
  messageId?: string;
  sessionId?: string;
}) {
  return (
    <div className={cn("w-fit space-y-2", className)}>
      <div
        className={cn(
          "w-fit p-2 rounded-2xl text-sm",
          "bg-secondary border shadow-sm",
        )}
      >
        {children}
      </div>
      {/* TODO: render this in a good way... right now it takes too much space under the message */}
      {/* {messageId && sessionId && (
          <VoteButtons
            messageId={messageId}
            sessionId={sessionId}
            className="self-end"
          />
        )} */}
    </div>
  );
}
