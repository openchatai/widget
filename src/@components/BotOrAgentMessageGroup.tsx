import { AgentMessageType, AgentType, BotMessageType } from "@core/types";
import { Avatar, AvatarImage } from "@ui/avatar";
import React from "react";
import { cn } from "src/utils";
import { BotOrAgentMessage } from "./BotOrAgentMessage";
import { BotOrAgentMessageWrapper } from "./BotOrAgentMessageWrapper";
import { useChatSession } from "@react/core-integration";

export function BotOrAgentMessageGroup({
  messages,
  agent,
}: {
  messages: BotMessageType[] | AgentMessageType[];
  agent: AgentType | undefined;
}) {
  const { chatSession, } = useChatSession();

  return (
    <div className={cn("flex flex-col items-start gap-2", "pr-8")}>
      <Avatar>
        <AvatarImage src={agent?.avatar ?? ""} alt="Agent Icon" />
      </Avatar>
      {messages.map((message) => {
        if (message.component == "CHAT_EVENT") {
          return <BotOrAgentMessage message={message} key={message.id} />;
        }
        return (
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
        );
      })}
    </div>
  );
}
