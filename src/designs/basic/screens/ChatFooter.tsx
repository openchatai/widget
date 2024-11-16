import { useChat, useChatCompletions, useConfigData, useContact, useLocale } from "@lib/index";
import * as Popover from "@radix-ui/react-popover";
import { Command, CommandGroup, CommandItem, CommandList } from 'cmdk';
import { CircleDashed, SendHorizonal } from "lucide-react";
import React, { ComponentProps, useEffect, useRef, useState } from "react";
import { useMeasure } from "react-use";
function CompletionsRender({
    completions,
    onSelect,
    onInteractionOutside
}: {
    completions: string[];
    onSelect: (completion: string) => void;
    onInteractionOutside?: ComponentProps<typeof Popover.Content>['onInteractOutside'];
}) {
    if (completions.length === 0) {
        return null;
    }
    return (
        <Popover.Content
            sideOffset={10}
            style={{
                width: `var(--radix-popper-anchor-width)`
            }}
            asChild
            onInteractOutside={onInteractionOutside}
            side="top" align="center"
            className="bg-background h-fit scroll-smooth max-h-40 border shadow-md w-full rounded-xl p-1 overflow-y-auto z-10">
            <CommandList>
                <CommandGroup>
                    {completions.map((completion, index) => (
                        <CommandItem
                            key={index}
                            className="p-2
            data-[selected=true]:bg-secondary data-[selected=true]:text-secondary-foreground
            cursor-pointer rounded-lg text-sm hover:bg-secondary hover:text-secondary-foreground transition-all"
                            onSelect={() => onSelect(completion)}
                        >
                            {completion}
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Popover.Content>
    );
}

function AttachFile() {
    return null
}

export function ChatFooter() {
    const { collectUserData, http } = useConfigData()
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const { sendMessage, hookState, session } = useChat();
    const { contact } = useContact();
    const locale = useLocale();
    const { inputText, setInputText, completions, setCompletions } = useChatCompletions(async (input) => {
        if (session) return null;
        const resp = await http.apis.getCompletions(input);
        if (resp.data.completions) {
            return resp.data.completions;
        }
        return []
    }, 700);

    const shouldCollectDataFirst = collectUserData && !contact?.id;

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.currentTarget.value;
        setInputText(value);
    };

    async function handleInputSubmit(text: string) {
        if (text.trim().length === 0) {
            return;
        }
        sendMessage({
            content: {
                text,
            },
            user: {
                email: contact?.email || undefined,
                name: contact?.name || undefined,
                avatarUrl: contact?.avatar_url || undefined,
            }
        });
        setInputText("");
    }

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const isLoading = hookState.state === "loading";
    const shouldShowCompletions = completions.length > 0;
    const [showCompletions, setShowCompletions] = useState(shouldShowCompletions);
    const [containerRef, dimentions] = useMeasure<HTMLDivElement>();

    return (
        <div className="p-3 relative">
            <Popover.Root
                open={showCompletions && shouldShowCompletions}>
                <Command loop>
                    <Popover.Anchor asChild>
                        <div className="rounded-xl relative gap-2 border border-px border-zinc-200 transition-all shadow-sm">
                            <textarea
                                ref={inputRef}
                                id='chat-input'
                                data-padding={dimentions.width}
                                disabled={isLoading || shouldCollectDataFirst}
                                value={inputText}
                                style={{
                                    paddingRight: `${dimentions.width}px`
                                }}
                                rows={3}
                                className={`outline-none w-full p-2 text-zinc-900 text-sm bg-transparent resize-none placeholder:text-zinc-400`}
                                onChange={handleInputChange}
                                onFocus={() => setShowCompletions(true)}
                                onKeyDown={async (event) => {
                                    if (event.key === "Enter" && !event.shiftKey) {
                                        event.preventDefault();
                                        await handleInputSubmit(inputText);
                                    }
                                }}
                                placeholder={locale.get("write-a-message")}
                            />
                            <div
                                ref={containerRef}
                                className="absolute bottom-1.5 right-1.5 w-fit">
                                <button
                                    onClick={() => handleInputSubmit(inputText)}
                                    disabled={isLoading || shouldCollectDataFirst}
                                    className="rounded-lg p-1.5 hover:brightness-90 transition-all text-foreground bg-primary disabled:opacity-50"
                                >
                                    {isLoading ? (
                                        <CircleDashed className="size-4 animate-spin animate-iteration-infinite" />
                                    ) : (
                                        <SendHorizonal className="size-4 rtl:-scale-100" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </Popover.Anchor>
                    <CompletionsRender
                        completions={completions}
                        onInteractionOutside={(event) => {
                            const target = event.target as HTMLElement;
                            if (target.closest("#chat-input")) {
                                return;
                            }
                            setShowCompletions(false)
                        }}
                        onSelect={(completion) => {
                            setInputText(completion);
                            setCompletions([]);
                            handleInputSubmit(completion);
                        }}
                    />
                </Command>
            </Popover.Root>
        </div >
    );
}
