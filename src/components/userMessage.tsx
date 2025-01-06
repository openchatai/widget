import React, { useMemo } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";
import { formatDistance } from "date-fns";
import { CheckCheck } from "lucide-react";
import { RenderAttachment } from "./RenderFile";
import { WidgetOptions } from "@react/types";
import { UserMessageType } from "@core/types";
import { cn } from "src/utils";

export function UserMessage({
  children,
  user,
  message,
}: {
  children: React.ReactNode;
  user: WidgetOptions["user"];
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
    <div
      className={cn(
        "group",
        "flex flex-col gap-2 justify-end items-end",
        "pl-8",
      )}
    >
      <Avatar>
        <AvatarImage src={user?.avatarUrl} alt={user?.name || "User avatar"} />
        <AvatarFallback>
          {user?.name?.slice(0, 2)?.toUpperCase() || "U"}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col items-end gap-1">
        <div
          className={cn(
            "w-fit p-2 rounded-2xl text-sm",
            "bg-primary text-primary-foreground border shadow-sm",
          )}
        >
          {children}
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
    </div>
  );
}
