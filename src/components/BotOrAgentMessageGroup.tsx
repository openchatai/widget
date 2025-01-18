import { AgentMessageType, AgentType, BotMessageType } from "core/types";
import { Avatar, AvatarImage } from "./lib/avatar";
import React from "react";
import { cn } from "src/utils";
import { BotOrAgentMessage } from "./BotOrAgentMessage";
import { BotOrAgentMessageWrapper } from "./BotOrAgentMessageWrapper";
import { useChatSession } from "react-web/core-integration";

export function BotOrAgentMessageGroup({
  messages,
  agent,
}: {
  messages: BotMessageType[] | AgentMessageType[];
  agent: AgentType | undefined;
}) {
  const { chatSession } = useChatSession();

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
            // @TODO
            agent: message.agent as any,
            messageId: message.id,
            sessionId: chatSession?.id,
          }}
        />
      ))}
    </div>
  );
}
