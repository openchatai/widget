import { WidgetOptions } from "../types";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

export function UserMessage({
  children,
  user,
}: {
  children: React.ReactNode;
  user: WidgetOptions["user"];
}) {
  return (
    <div className="flex flex-row w-full gap-1 justify-end">
      <div className="w-fit min-w-[50%]">
        <div
          className="bg-primary p-2.5 min-w-fit text-white rounded-lg leading-snug font-medium text-sm"
          style={{
            background: "#1883FF",
            boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.04)",
            borderRadius: "6px",
            color: "white",
          }}
        >
          {children}
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Avatar>
          <AvatarImage src={user?.avatarUrl} />
          <AvatarFallback>{user?.name?.at(0)}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
