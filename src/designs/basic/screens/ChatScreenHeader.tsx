import { useChat, useLocale } from '@lib/index';
import { Dialog, DialogTrigger } from '@ui/dialog';
import { Tooltip, TooltipContent, TooltipTrigger } from '@ui/tooltip';
import { RotateCcw, SettingsIcon } from 'lucide-react';
import { ClearSessionDialogContent, SettingsDialogContent } from './DialogContents';

const HeroImage = "https://cloud.opencopilot.so/widget/hero-image.png";

function SettingsDialog() {
    const locale = useLocale();
    return (
        <Dialog>
            <Tooltip>
                <TooltipContent>
                    {locale.get("settings")}
                </TooltipContent>
                <TooltipTrigger asChild>
                    <DialogTrigger className="p-1 rounded-full text-secondary bg-black/50 hover:brightness-110 flex-shrink-0">
                        <SettingsIcon className="size-4" />
                    </DialogTrigger>
                </TooltipTrigger>
            </Tooltip>
            <SettingsDialogContent />
        </Dialog>
    );
}

function HeroImageDisplay() {
    return (
        <div className="flex items-center justify-center -space-x-2">
            <img src={HeroImage} alt="Hero image" className="w-[122px]" />
        </div>
    );
}

function ClearSessionDialog() {
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
                            <DialogTrigger className="p-1 rounded-full text-secondary bg-black/50 hover:brightness-110 flex-shrink-0">
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

function InfoSection() {
    const locale = useLocale();
    return (
        <div className="flex items-center justify-center flex-col">
            <h2
                className="text-lg font-semibold text-background text-center"
                dir="auto"
            >
                {locale.get("got-any-questions")}
            </h2>
            <span
                className="text-sm text-white text-center"
                dir="auto"
            >
                {locale.get("typical-response-time")}
            </span>
        </div>
    );
}

function HeaderChatRunning() {
    return (
        <header className="p-3 gap-2 flex flex-col pb-4">
            <div className="w-full flex items-center justify-between">
                <SettingsDialog />
                <HeroImageDisplay />
                <ClearSessionDialog />
            </div>
        </header>
    );
}

function HeaderChatDidNotStart() {
    return (
        <header className="p-3 gap-2 flex flex-col">
            <div className="w-full flex items-center justify-between">
                <SettingsDialog />
                <HeroImageDisplay />
                <ClearSessionDialog />
            </div>
            <InfoSection />
        </header>
    );
}

function CompactHeader() {
    const { noMessages } = useChat();
    return noMessages ? <HeaderChatDidNotStart /> : <HeaderChatRunning />
}

export { CompactHeader };
