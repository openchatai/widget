import { WidgetOptions } from "@lib/types";
import React from "react";
import AgentIcon from "../static/agent-icon.png";
import { Avatar, AvatarImage } from "@ui/avatar";

export function BotResponseWrapper({
  children,
  bot,
}: {
  children: React.ReactNode;
  bot: WidgetOptions["bot"];
}) {
  return (
    <div className="flex flex-row items-end w-full gap-2">
      <Avatar className="flex items-center size-7 border-0">
        <AvatarImage
          src={bot?.avatarUrl ?? AgentIcon}
          alt="Agent Icon"
        />
      </Avatar>
      <div className="w-fit min-w-[80%]">
        <div
          className="bg-primary rounded-lg bg-white shadow-sm p-2.5 min-w-fit"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
