import React, { useMemo } from "react";
import { Avatar, AvatarImage } from "./avatar";
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
    <div className="flex flex-row w-full gap-1 justify-end items-end group">
      <div className="w-fit min-w-[50%]">
        <Tooltip>
          <TooltipTrigger asChild disabled={!formattedDt}>
            <div
              className="bg-primary p-2.5 relative min-w-fit text-white hover:brightness-110 rounded-lg leading-snug font-medium text-sm"
              style={{
                boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.04)",
              }}
            >
              {children}
              {
                formattedDt ? <CheckCheck className="absolute text-white bottom-1 right-1 size-4" /> : <Check className="absolute text-white bottom-1 right-1 size-4" />
              }
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="p-1 bg-gray-500">
            <span className="text-[.7rem] font-medium">
              {formattedDt}
            </span>
          </TooltipContent>
        </Tooltip>
      </div>
      <Avatar className="size-7">
        <AvatarImage src={user?.avatarUrl} />
      </Avatar>
    </div>
  );
}
