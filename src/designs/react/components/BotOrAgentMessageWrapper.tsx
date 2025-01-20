import React from "react";
import { cn } from "src/designs/react/components/lib/utils/cn";
import { AgentOrBotType } from "src/headless/core/types/agent-or-bot";

export function BotOrAgentMessageWrapper({
  children,
  className,
  messageId,
}: {
  children: React.ReactNode;
  className?: string;
  messageId?: string;
  sessionId?: string;
}) {
  return (
    <div
      className={cn("w-fit space-y-2", className)}
      data-test={`message-wrapper-${messageId}`}
    >
      <div
        data-test="message-content-wrapper"
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
