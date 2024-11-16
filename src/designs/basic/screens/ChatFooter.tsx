import { useChat, useChatCompletions, useConfigData, useContact, useLocale } from "@lib/index";
import * as Popover from "@radix-ui/react-popover";
import { Button } from "@ui/button";
import { Command, CommandGroup, CommandItem, CommandList } from 'cmdk';
import { CircleDashed, PaperclipIcon, SendHorizonal, XIcon } from "lucide-react";
import React, { ComponentProps, useEffect, useRef, useState } from "react";
import { useMeasure } from "react-use";
import { useDropzone } from 'react-dropzone';

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

interface FileWithProgress {
    status: "pending" | "uploading" | "success" | "error";
    id: string;
    file: File
}

function FileDisplay({ file, onCancel }: { file: FileWithProgress, onCancel: () => void; }) {
    const [fileContent, setFileContent] = useState<string | ArrayBuffer | null>(
        null
    );

    useEffect(() => {
        const reader = new FileReader();
        if (file.file.type.startsWith("image/")) {
            reader.onload = () => setFileContent(reader.result);
            reader.readAsDataURL(file.file);
        }
    }, [file]);

    return (
        <div className="size-11 group rounded-lg shrink-0 overflow-hidden relative">
            <button
                className="absolute p-1 rounded-full bg-black/20 text-foreground right-1 bottom-1"
                onClick={onCancel}
            >
                <XIcon className="size-3" />
            </button>
            {file.file.type.startsWith("image/") && fileContent && (
                <img
                    src={fileContent as string}
                    alt={file.file.name}
                    className="object-cover size-full"
                />
            )}
        </div>
    );

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
    const [files, setFiles] = useState<FileWithProgress[]>([]);
    const [abortControllers, setAbortControllers] = useState<
        Record<string, AbortController>
    >({});

    const uploadFile = async (file: FileWithProgress) => {
        const controller = new AbortController();
        setAbortControllers((prev) => ({
            ...prev,
            [file.id]: controller,
        }));

        const formData = new FormData();
        formData.append("file", file.file);

        try {
            file.status = "uploading";
            setFiles((prev) => [...prev]);

            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
                signal: controller.signal,
                headers: {
                    "X-Requested-With": "XMLHttpRequest", // Optional header
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to upload: ${response.statusText}`);
            }

            file.status = "success";
            setFiles((prev) => [...prev]);
        } catch (error) {
            if (controller.signal.aborted) {
                // 
            } else {
                file.status = "error";
            }
            setFiles((prev) => [...prev]);
        } finally {
            delete abortControllers[file.id];
        }
    };

    const handleFileDrop = (acceptedFiles: File[]) => {
        const newFiles = acceptedFiles.map((file) => ({
            file,
            progress: 0,
            status: "pending" as const,
            id: crypto.randomUUID(),
        }));
        setFiles((prev) => [...prev, ...newFiles]);

        newFiles.forEach((file) => {
            uploadFile(file);
        });
    };

    const handleCancelUpload = (fileId: string) => {
        if (abortControllers[fileId]) {
            abortControllers[fileId].abort();
            setAbortControllers((prev) => {
                const { [fileId]: _, ...rest } = prev;
                return rest;
            });
        }
        setFiles((prev) => prev.filter((file) => file.id !== fileId));
    };

    const rdz = useDropzone({
        onDrop: handleFileDrop,
        noClick: true,
    });

    return (
        <div className="p-2 relative space-y-1" {...rdz.getRootProps()}>
            <input {...rdz.getInputProps()} />

            <Popover.Root
                open={showCompletions && shouldShowCompletions}>
                <Command loop>
                    <Popover.Anchor asChild>
                        <div className="rounded-xl relative gap-2 border border-px border-zinc-200 transition-all shadow-sm">
                            {
                                files.length > 0 && (<div className="flex items-center gap-1 p-2 border-b">
                                    {files.map((file) => (
                                        <FileDisplay
                                            key={file.id}
                                            onCancel={() => handleCancelUpload(file.id)}
                                            file={file}
                                        />
                                    ))}
                                </div>)
                            }
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
                                className="absolute space-x-1 bottom-1.5 right-1.5 w-fit">
                                <Button
                                    onClick={() => {
                                        rdz.open();
                                    }}
                                    size='fit' variant={"outline"}>
                                    <PaperclipIcon className="size-4" />
                                </Button>
                                <Button
                                    size='fit'
                                    onClick={() => handleInputSubmit(inputText)}
                                    disabled={isLoading || shouldCollectDataFirst}
                                    className="hover:brightness-90"
                                >
                                    {isLoading ? (
                                        <CircleDashed className="size-4 animate-spin animate-iteration-infinite" />
                                    ) : (
                                        <SendHorizonal className="size-4 rtl:-scale-100" />
                                    )}
                                </Button>

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
