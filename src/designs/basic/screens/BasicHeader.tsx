import { Dialog, DialogTrigger } from "@ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@ui/tooltip";
import { RotateCcw, SettingsIcon } from "lucide-react";
import { ClearSessionDialogContent, SettingsDialogContent } from "./DialogContents";
import { useConfigData, useLocale } from "@lib/index";

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

function ResetConversationDialog() {
    const locale = useLocale();
    return (
        <Dialog>
            {({ setOpen }) => (
                <>
                    <Tooltip>
                        <TooltipContent>
                            {locale.get("reset-conversation")}
                        </TooltipContent>
                        <TooltipTrigger asChild>
                            <DialogTrigger className="p-1 rounded-full text-secondary-foreground hover:brightness-110 flex-shrink-0">
                                <RotateCcw className="size-4" />
                            </DialogTrigger>
                        </TooltipTrigger>
                    </Tooltip>
                    <ClearSessionDialogContent setOpen={setOpen} />
                </>
            )}
        </Dialog>
    );
}
function BasicHeader() {
    const { preludeSWR } = useConfigData()

    return (
        <header className="p-1 border-b border-border bg-background">
            <div className="flex items-center">
                <SettingsDialog />
                <h2 className="flex-1">
                    {preludeSWR.data?.organization_name}
                </h2>
                <ResetConversationDialog />
            </div>
        </header>
    )
}

export { BasicHeader }