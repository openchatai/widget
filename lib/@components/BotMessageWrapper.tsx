import { WidgetOptions } from "@lib/types";
import React from "react";
import AgentIcon from "../static/agent-icon.png";

export function BotResponseWrapper({
  children,
  bot,
}: {
  children: React.ReactNode;
  bot: WidgetOptions["bot"];
}) {
  return (
    <div className="flex flex-row items-end wfull">
      <div className="flex items-center">
        <img
          src={bot?.avatarUrl ?? AgentIcon}
          alt="Agent Icon"
          style={{
            width: "30px",
            marginRight: " 0.75rem",
          }}
        />
      </div>
      <div className="w-fit min-w-[50%]">
        <div
          className="bg-primary p-2.5 min-w-fit text-white rounded-lg"
          style={{
            background: "white",
            boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.04)",
            borderRadius: "6px",
            color: "black",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
