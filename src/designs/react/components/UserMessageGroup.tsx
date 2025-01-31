
import { formatDistance } from "date-fns";
import React, { useMemo } from "react";
import { Avatar, AvatarImage } from "./lib/avatar";
import { RenderAttachment } from "./RenderFile";
import type { UserMessageType } from "../../../headless/core";
import { cn } from "./lib/utils/cn";
import { useConfig } from "../../../headless/react";


function UserMessage({
  message,
}: {
  message: UserMessageType;
}) {
  const formattedDt = useMemo(() => {
    if (message.deliveredAt) {
      return formatDistance(new Date(message.deliveredAt), new Date(), {
        addSuffix: true,
      });
    }
    return null;
  }, [message.deliveredAt]);

  return (
    <div className="flex flex-col items-end gap-1">
      <div
        className={cn(
          "w-fit p-2 rounded-2xl text-sm",
          "bg-primary text-primary-foreground border shadow-sm",
        )}
      >
        {message.content}
        {/* {formattedDt && (
            <div className="flex items-center justify-end gap-1 text-[10px] text-muted">
              <span>{formattedDt}</span>
              <CheckCheck className="size-3" />
            </div>
          )} */}
      </div>

      {message.attachments && message.attachments.length > 0 && (
        <div className="flex gap-1 flex-wrap justify-end">
          {message.attachments?.map((attachment) => (
            <RenderAttachment attachment={attachment} key={attachment.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export function UserMessageGroup({
  messages,
}: { messages: UserMessageType[] }) {
  const { user } = useConfig();

  return (
    <div
      className={cn(
        "group",
        "flex flex-col gap-2 justify-end items-end",
      )}
    >
      <Avatar className="bg-primary text-primary-foreground">
        <AvatarImage src={user?.data?.avatarUrl} alt={user?.data?.name || "User avatar"} />
        {/* <AvatarFallback>
          {user?.name?.slice(0, 1)?.toUpperCase()}
        </AvatarFallback> */}
      </Avatar>

      {messages.map((message) => (
        <UserMessage key={message.id} message={message} />
      ))}
    </div>
  );
}
