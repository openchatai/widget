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
    <div className="flex flex-row items-end w-full gap-2">
      <Avatar className="flex items-center size-7 border-0">
        <AvatarImage src={agent?.profile_picture ?? ""} alt="Agent Icon" />
      </Avatar>
      <div className={cn("w-fit min-w-[80%]", className)}>
        <div className="rounded-xl rounded-bl-none bg-secondary shadow-sm p-2.5 min-w-fit">
          {children}
        </div>
        {
          messageId && sessionId && (
            <VoteButtons messageId={messageId} sessionId={sessionId} className="self-end" />
          )
        }
      </div>
    </div>
  );
}
