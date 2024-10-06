import React from "react";
import { WidgetOptions } from "../types";
import { Avatar, AvatarImage } from "./avatar";

export function UserMessage({
  children,
  user,
}: {
  children: React.ReactNode;
  user: WidgetOptions["user"];
}) {
  return (
    <div className="flex flex-row w-full gap-1 justify-end items-end">
      <div className="w-fit min-w-[50%]">
        <div
          className="bg-primary p-2.5 min-w-fit text-white rounded-lg leading-snug font-medium text-sm"
          style={{
            background: "#1883FF",
            boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.04)",
          }}
        >
          {children}
        </div>
      </div>
      <Avatar className="size-7">
        <AvatarImage src={user?.avatarUrl} />
      </Avatar>
    </div>
  );
}
