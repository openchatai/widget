import {
  AgentMessageType,
  AgentOrBotType,
  BotMessageType,
} from "src/headless/core";
import { Avatar, AvatarImage } from "./lib/avatar";
import React from "react";
import { cn } from "src/designs/react/components/lib/utils/cn";
import { BotOrAgentMessage } from "./BotOrAgentMessage";
import { BotOrAgentMessageWrapper } from "./BotOrAgentMessageWrapper";
import { useSession } from "src/headless/react";

export function BotOrAgentMessageGroup({
  messages,
  agent,
}: {
  messages: BotMessageType[] | AgentMessageType[];
  agent: AgentOrBotType | undefined;
}) {
  const { session } = useSession();

  return (
    <div className={cn("flex flex-col items-start gap-2", "pr-8")}>
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
            sessionId: session.session?.id,
          }}
        />
      ))}
    </div>
  );
}
