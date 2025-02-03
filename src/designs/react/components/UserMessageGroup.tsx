import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./lib/avatar";
import { AttachmentPreview } from "./AttachmentPreview";
import type { UserMessageType } from "../../../headless/core";
import { cn } from "./lib/utils/cn";
import { useConfig } from "../../../headless/react";

function UserMessage({
  message,
}: {
  message: UserMessageType;
}) {
  return (
    <div className="w-5/6 flex flex-col items-end gap-1">
      {message.attachments && message.attachments.length > 0 && (
        <div className="w-full flex gap-1 flex-wrap justify-end">
          {message.attachments?.map((attachment) => (
            <AttachmentPreview attachment={attachment} key={attachment.id} />
          ))}
        </div>
      )}
      {message.content.length > 0 && (
        <div
          className={cn(
            "w-fit p-2 rounded-2xl text-sm",
            "bg-primary text-primary-foreground border shadow-sm",
            "break-words [word-break:break-word]", // `[word-break:break-word]` is deprecated but works in the browser, while `break-words` which is `[overflow-wrap: break-word]` does not work
          )}
        >
          {message.content}
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
    <div className={cn("group", "flex flex-col gap-2 justify-end items-end")}>
      <Avatar className="bg-primary text-primary-foreground">
        <AvatarImage
          src={user?.data?.avatarUrl}
          alt={user?.data?.name || "User avatar"}
        />
        {user?.data?.name && (
          <AvatarFallback>
            {user?.data?.name?.slice(0, 1)?.toUpperCase()}
          </AvatarFallback>
        )}
      </Avatar>

      {messages.map((message) => (
        <UserMessage key={message.id} message={message} />
      ))}
    </div>
  );
}
