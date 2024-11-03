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
      <div className="flex flex-col items-end gap-1 relative">
        <div className="max-w-[85%] min-w-[60px]">
          <div className="bg-zinc-900 dark:bg-zinc-800 p-3 text-white hover:bg-zinc-800 dark:hover:bg-zinc-700/90 rounded-xl leading-relaxed text-sm">
            {children}
          </div>
          {formattedDt && (
            <div className="flex items-center gap-1 mt-1 text-[10px] text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span>{formattedDt}</span>
              <CheckCheck className="size-3" />
            </div>
          )}
        </div>
      </div>
      <Avatar className="size-8 ring-2 ring-white dark:ring-zinc-900 shadow-sm">
        <AvatarImage 
          src={user?.avatarUrl} 
          className="object-cover"
          alt={user?.name || 'User avatar'}
        />
        <AvatarFallback className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-xs font-medium">
          {user?.name?.slice(0, 2)?.toUpperCase() || 'U'}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
