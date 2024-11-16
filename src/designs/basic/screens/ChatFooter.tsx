import { useChat, useChatCompletions, useConfigData, useContact, useLocale } from "@lib/index";
import * as Popover from "@radix-ui/react-popover";
import { Button } from "@ui/button";
import { Command, CommandGroup, CommandItem, CommandList } from 'cmdk';
import { CircleDashed, FileAudio, FileIcon, PaperclipIcon, SendHorizonal, XIcon } from "lucide-react";
import React, { ComponentProps, useEffect, useRef, useState } from "react";
import { useMeasure } from "react-use";
import { useDropzone } from 'react-dropzone';
import { Tooltip, TooltipContent, TooltipTrigger } from "@ui/tooltip";
import { genId } from "@lib/utils/genId";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

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
    file: File;
    fileUrl?: string;
}

function FileDisplay({ file: { file }, onCancel }: { file: FileWithProgress, onCancel: () => void; }) {
    const [fileContent, setFileContent] = useState<string | ArrayBuffer | null>(
        null
    );

    useEffect(() => {
        const reader = new FileReader();
        if (file.type.startsWith("image/")) {
            reader.onload = () => setFileContent(reader.result);
            reader.readAsDataURL(file);
        }
    }, [file]);

    const fileType = file.type.split("/")[0];

    let FileDisplay = () => <FileIcon />;

    if (fileType === "image") {
        FileDisplay = () => <img src={fileContent as string} className="object-cover size-full" alt={file.name} />;
    }

    else if (fileType === "audio") {
        FileDisplay = () => <FileAudio />;
    }

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    initial={{ opacity: 0, y: 10 }}
                    className="size-11 flex border items-center justify-center group rounded-lg shrink-0 overflow-hidden relative">
                    <button
                        className="absolute p-0.5 rounded-full bg-black/20 text-foreground right-0.5 bottom-0.5"
                        onClick={onCancel}
                    >
                        <XIcon className="size-3" />
                    </button>
                    <FileDisplay />
                </motion.div>
            </TooltipTrigger>
            <TooltipContent className="text-xs">
                {file.name}
            </TooltipContent>
        </Tooltip>
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
            const data = await response.json() as {
                url: string;
            };
            file.fileUrl = data.url;
            file.status = "success";
            setFiles((prev) => [...prev]);
        } catch {
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
            id: genId(10),
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
                                files.length > 0 && (
                                    <motion.div
                                        animate={{
                                            transition: {
                                                staggerChildren: 0.5,
                                                delayChildren: 0.5
                                            }
                                        }}
                                        className="flex items-center gap-0.5 p-1 border-b">
                                        {files.map((file) => (
                                            <AnimatePresence key={file.id}>
                                                <FileDisplay
                                                    onCancel={() => handleCancelUpload(file.id)}
                                                    file={file}
                                                />
                                            </AnimatePresence>
                                        ))}
                                    </motion.div>
                                )
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
