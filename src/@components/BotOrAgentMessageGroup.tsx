import { AgentMessageType, AgentType, BotMessageType } from "@core/types";
import { Avatar, AvatarImage } from "@ui/avatar";
import React from "react";
import { cn } from "src/utils";
import { BotOrAgentMessage } from "./BotOrAgentMessage";
import { BotOrAgentMessageWrapper } from "./BotOrAgentMessageWrapper";
import { useChat } from "@react/index";

export function BotOrAgentMessageGroup({
  messages,
  agent,
}: {
  messages: BotMessageType[] | AgentMessageType[];
  agent: AgentType | undefined;
}) {
  const { session } = useChat();

  return (
    <div className={cn("flex flex-col items-start gap-2", "pr-8")}>
      <Avatar>
        <AvatarImage src={agent?.profile_picture ?? ""} alt="Agent Icon" />
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
              agent: message.agent,
              messageId: message.id,
              sessionId: session?.id,
            }}
          />
        );
      })}
    </div>
  );
}
