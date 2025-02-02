import { Avatar, AvatarFallback, AvatarImage } from "./lib/avatar";
import React from "react";
import { BotOrAgentMessage } from "./BotOrAgentMessage";
import type {
  AgentMessageType,
  AgentOrBotType,
  BotMessageType,
} from "../../../headless/core";
import { cn } from "./lib/utils/cn";
import { Tooltippy } from "./lib/tooltip";

export function BotOrAgentMessageGroup({
  messages,
  agent,
}: {
  messages: BotMessageType[] | AgentMessageType[];
  agent: AgentOrBotType | undefined;
}) {
  return (
    <div className={cn("flex flex-col items-start gap-2")}>
      <Tooltippy content={agent?.name} side="right" align="end">
        <Avatar>
          <AvatarImage src={agent?.avatar ?? ""} alt="Agent Icon" />
          {agent?.name && (
            <AvatarFallback>
              {agent?.name?.slice(0, 1)?.toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>
      </Tooltippy>
      {messages.map((message) => (
        <BotOrAgentMessage key={message.id} {...message} />
      ))}
    </div>
  );
}
