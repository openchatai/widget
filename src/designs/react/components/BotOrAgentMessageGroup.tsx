import { Avatar, AvatarImage } from "./lib/avatar";
import React from "react";
import { BotOrAgentMessage } from "./BotOrAgentMessage";
import { BotOrAgentMessageWrapper } from "./BotOrAgentMessageWrapper";
import type {
  AgentMessageType,
  AgentOrBotType,
  BotMessageType,
} from "../../../headless/core";
import { useSessions } from "../../../headless/react";
import { cn } from "./lib/utils/cn";

export function BotOrAgentMessageGroup({
  messages,
  agent,
}: {
  messages: BotMessageType[] | AgentMessageType[];
  agent: AgentOrBotType | undefined;
}) {
  const { sessionState } = useSessions();

  return (
    <div className={cn("flex flex-col items-start gap-2")}>
      <Avatar>
        <AvatarImage src={agent?.avatar ?? ""} alt="Agent Icon" />
      </Avatar>
      {messages.map((message) => (
        <BotOrAgentMessage
          key={message.id}
          message={message}
          Wrapper={BotOrAgentMessageWrapper}
          wrapperProps={{
            messageId: message.id,
            sessionId: sessionState.session?.id,
          }}
        />
      ))}
    </div>
  );
}
