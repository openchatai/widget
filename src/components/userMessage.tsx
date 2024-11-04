import React, { useMemo } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";
import { formatDistance } from "date-fns";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { Check, CheckCheck } from 'lucide-react';
import { UserMessageType, WidgetOptions } from "@lib/types";

export function UserMessage({
  children,
  user, message
}: {
  children: React.ReactNode;
  user: WidgetOptions["user"];
  message: UserMessageType
}) {
  const formattedDt = useMemo(() => {
    if (message.deliveredAt) {
      return formatDistance(
        new Date(message.deliveredAt),
        new Date(),
        { addSuffix: true }
      )
    }
    return null
  }, [message.deliveredAt]);

  return (
    <div className="flex flex-row w-full gap-2 justify-end items-start group">
      <div className="w-fit min-w-[50%]">
        <Tooltip>
          <TooltipTrigger asChild disabled={!formattedDt}>
            <div
              className="bg-primary p-2.5 relative min-w-fit text-secondary hover:brightness-110 rounded-lg rounded-br-none leading-snug font-medium text-sm">
              {children}
              {
                formattedDt ? <CheckCheck className="absolute text-secondary bottom-1 right-1 size-4" /> : <Check className="absolute text-foreground bottom-1 right-1 size-4" />
              }
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <span className="text-[.7rem] font-medium">
              {formattedDt}
            </span>
          </TooltipContent>
        </Tooltip>
      </div>
      <Avatar className="size-7">
        <AvatarImage src={user?.avatarUrl} />
        <AvatarFallback>
          {user?.name?.[0] || "U"}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
