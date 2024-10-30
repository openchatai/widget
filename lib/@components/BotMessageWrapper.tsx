import React from "react";
import { Avatar, AvatarImage } from "@ui/avatar";
import { cn } from "src/utils";
import { BotMessageType } from "@lib/types";

export function BotResponseWrapper({
  children,
  agent,
  className
}: {
  children: React.ReactNode;
  agent: BotMessageType['agent']
  className?: string
}) {
  return (
    <div className="flex flex-row items-end w-full gap-2">
      <Avatar className="flex items-center size-7 border-0">
        <AvatarImage
          src={agent?.profile_picture ?? ""}
          alt="Agent Icon"
        />
      </Avatar>
      <div className={cn("w-fit min-w-[80%]", className)}>
        <div
          className="bg-primary rounded-lg bg-white shadow-sm p-2.5 min-w-fit"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
