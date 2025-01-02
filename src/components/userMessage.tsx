import React, { useMemo } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";
import { formatDistance } from "date-fns";
import { CheckCheck } from 'lucide-react';
import { RenderAttachment } from "./RenderFile";
import { WidgetOptions } from "@react/types";
import { UserMessageType } from "@core/types";

export function UserMessage({
  children,
  user, message
}: {
  children: React.ReactNode;
  user: WidgetOptions["user"];
  message: UserMessageType;
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
        <div className="max-w-[85%] min-w-fit">
          <div className="bg-primary p-2 text-primary-foreground rounded-xl leading-relaxed text-sm">
            {children}
          </div>
          {
            message.attachments && message.attachments.length > 0 && (<div className="flex gap-1 flex-wrap mb-1">
              {message.attachments?.map((attachment) => (
                <RenderAttachment attachment={attachment} key={attachment.id} />
              ))}
            </div>)
          }
          {formattedDt && (
            <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span>{formattedDt}</span>
              <CheckCheck className="size-3" />
            </div>
          )}
        </div>
      </div>
      <Avatar className="size-8 ring-2 ring-white shadow-sm">
        <AvatarImage
          src={user?.avatarUrl}
          className="object-cover"
          alt={user?.name || 'User avatar'}
        />
        <AvatarFallback className="bg-zinc-100 text-zinc-600 text-xs font-medium">
          {user?.name?.slice(0, 2)?.toUpperCase() || 'U'}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}