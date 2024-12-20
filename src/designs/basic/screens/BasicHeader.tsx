import React from "react";
import { Dialog, DialogTrigger } from "@ui/dialog";
import { Tooltippy } from "@ui/tooltip";
import { RotateCcw, SettingsIcon } from "lucide-react";
import { ClearSessionDialogContent, SettingsDialogContent } from "./DialogContents";
import { Skeleton } from "@ui/skeleton";
import { useLocale, usePreludeData } from "@react/index";

function SettingsDialog() {
    const locale = useLocale();
    return (
        <Dialog>
            <Tooltippy
                content={locale.get("settings")}
            >
                <DialogTrigger className="p-1.5 rounded-xl text-secondary-foreground flex-shrink-0">
                    <SettingsIcon className="size-5" />
                </DialogTrigger>
            </Tooltippy>
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
                    <Tooltippy content={locale.get("reset-conversation")}>
                        <DialogTrigger className="p-1 rounded-full text-secondary-foreground hover:brightness-110 flex-shrink-0">
                            <RotateCcw className="size-4" />
                        </DialogTrigger>
                    </Tooltippy>
                    <ClearSessionDialogContent setOpen={setOpen} />
                </>
            )}
        </Dialog>
    );
}

function BasicHeader() {
    const { data, isLoading } = usePreludeData();
    return (
        <header className="p-2 border-b border-border bg-background">
            <div className="flex items-center gap-2">
                <SettingsDialog />
                <div className="flex-1">
                    {
                        isLoading ? <Skeleton className="h-4 w-2/3" /> : (
                            <h2 className="font-semibold">
                                {data?.organization_name}
                            </h2>
                        )
                    }
                </div>
                <ResetConversationDialog />
            </div>
        </header>
    )
}

export { BasicHeader }