import { Avatar, AvatarFallback } from "@lib/components/avatar";

export function BotLoadingComponent() {
  return (
    <div className="flex flex-col items-end wfull gap-1">
      <div className="flex items-center gap-1">
        <Avatar className="animate-pulse bg-secondary animate-iteration-infinite animate-alternate">
          <AvatarFallback />
        </Avatar>
      </div>
      <div className="w-1/2 min-w-2/3">
        <div className="bg-secondary animate-alternate p6 rounded-lg animate-pulse animate-iteration-infinite" />
      </div>
    </div>
  );
}
