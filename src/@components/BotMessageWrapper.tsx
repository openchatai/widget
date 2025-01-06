import React from "react";
import { Avatar, AvatarImage } from "@ui/avatar";
import { cn } from "src/utils";
import { BotMessageType } from "@core/types/messages";
import { VoteButtons } from "../components/VoteButtons";

export function BotResponseWrapper({
  children,
  agent,
  className,
  messageId,
  sessionId,
}: {
  children: React.ReactNode;
  agent: BotMessageType["agent"];
  className?: string;
  messageId?: string;
  sessionId?: string;
}) {
  return (
    <div className={cn("flex flex-col items-start gap-2", "pr-8")}>
      <Avatar>
        <AvatarImage src={agent?.profile_picture ?? ""} alt="Agent Icon" />
      </Avatar>
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
    </div>
  );
}
