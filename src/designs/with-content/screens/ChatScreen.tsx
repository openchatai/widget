import { ChatScreen as BasicChatScreen } from "../../basic/screens/ChatScreen";
import { Dialog, DialogTrigger } from "@ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@ui/tooltip";
import { ChevronLeft, RotateCcw, SettingsIcon } from "lucide-react";
import { useLocale } from "@lib/index";
import { usePreludeData } from "@lib/providers/usePreludeData";
import { Skeleton } from "@ui/skeleton";
import { ClearSessionDialogContent, SettingsDialogContent } from "src/designs/_shared/DialogContents";
import { Link } from "wouter";
import { Button } from "@ui/button";

function SettingsDialog() {
    const locale = useLocale();
    return (
        <Dialog>
            <Tooltip>
                <TooltipContent>
                    {locale.get("settings")}
                </TooltipContent>
                <TooltipTrigger asChild>
                    <DialogTrigger className="p-1.5 rounded-xl text-secondary-foreground flex-shrink-0">
                        <SettingsIcon className="size-5" />
                    </DialogTrigger>
                </TooltipTrigger>
            </Tooltip>
            <SettingsDialogContent />
        </Dialog>
    );
}

function BasicHeader() {
    const { data, isLoading } = usePreludeData();
    return (
        <header className="p-2 border-b border-border bg-background">
            <div className="flex items-center gap-2">
                <Button asChild size='icon' variant={"ghost"}>
                    <Link to="/">
                        <ChevronLeft className="size-4" />
                    </Link>
                </Button>
                <div className="flex-1">
                    {
                        isLoading ? <Skeleton className="h-4 w-2/3" /> : (
                            <h2 className="font-semibold">
                                {data?.organization_name}
                            </h2>
                        )
                    }
                </div>
                <SettingsDialog />
            </div>
        </header>
    )
}

export { BasicHeader }
export function ChatScreen() {
    return (
        <BasicChatScreen header={<BasicHeader/>} headerStyle="basic" className="h-[600px]" />
    )
}