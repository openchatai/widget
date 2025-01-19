import { AgentMessageType, AgentOrBotType, BotMessageType } from "core/types";
import { Avatar, AvatarImage } from "./lib/avatar";
import React from "react";
import { cn } from "src/utils";
import { BotOrAgentMessage } from "./BotOrAgentMessage";
import { BotOrAgentMessageWrapper } from "./BotOrAgentMessageWrapper";
import { useSession } from "react-web/core-integration";

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
