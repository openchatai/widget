import { Avatar, AvatarFallback } from "@ui/avatar";

export function BotLoadingComponent() {
  return (
    <div className="flex flex-col items-start w-full gap-1">
      <div className="flex items-center gap-1">
        <Avatar className="animate-pulse size-7 rounded-full bg-secondary">
          <AvatarFallback />
        </Avatar>
      </div>
      <div className="w-1/2 min-w-[80%]">
        <div className="bg-secondary p-7 rounded-lg animate-pulse" />
      </div>
    </div>
  );
}
