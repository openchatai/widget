import React from "react";
import { useChat, useLocale } from "@react/index";
import { Dialog, DialogContent } from "@ui/dialog";
import { CheckCheckIcon } from "lucide-react";

export function SessionClosedDialog() {
    const { session, recreateSession, hookState } = useChat();
    const locale = useLocale();

    // there is a session and it's closed
    if (session && session.isSessionClosed !== true) return null;
    if (hookState.state === "loading") return null // don't show while loading.

    return (
        <Dialog open={session?.isSessionClosed}>
            <DialogContent>
                <header className="flex items-center gap-1">
                    <CheckCheckIcon className="size-5 text-emerald-500" />
                    <h2 className="text-base font-medium" dir="auto">
                        {locale.get("session-closed-lead")}
                    </h2>
                </header>
                <footer className="grid mt-2">
                    <button
                        onClick={recreateSession}
                        className="text-sm font-medium hover:brightness-110 whitespace-nowrap px-3 py-2 bg-primary text-white rounded-md"
                    >
                        {locale.get("create-new-ticket")}
                    </button>
                </footer>
            </DialogContent>
        </Dialog>
    );
}
