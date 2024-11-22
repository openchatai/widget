import { FileWithProgress, useChat, useChatCompletions, useConfigData, useContact, useLocale, useUploadFiles } from "@lib/index";
import * as Popover from "@radix-ui/react-popover";
import { Button } from "@ui/button";
import { Command, CommandGroup, CommandItem, CommandList } from 'cmdk';
import { AlertCircle, CircleDashed, FileAudio, FileIcon, Loader2, PaperclipIcon, SendHorizonal, XIcon } from "lucide-react";
import React, { ComponentProps, useEffect, useRef, useState } from "react";
import useMeasure from "react-use/lib/useMeasure";
import { useDropzone } from 'react-dropzone';
import { Tooltippy } from "@ui/tooltip";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { AIClosureType } from "@lib/types/schemas";

function CompletionsRender({
    completions,
    onSelect,
    onInteractionOutside,
    prefix
}: {
    completions: string[];
    onSelect: (completion: string) => void;
    prefix?: string;
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
                            onSelect={() => onSelect(prefix + completion)}
                        >
                            {prefix}{" "}{completion}
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Popover.Content>
    );
}

function FileDisplay({ file: { status, file, error }, onCancel }: { file: FileWithProgress, onCancel: () => void; }) {
    const [fileContent, setFileContent] = useState<string | ArrayBuffer | null>(
        null
    );

    useEffect(() => {
        if (!file.type.startsWith("image/")) return;

        const reader = new FileReader();
        reader.onload = () => setFileContent(reader.result as string);
        reader.onerror = () => console.error("Error reading file");
        reader.readAsDataURL(file);

        return () => reader.abort();
    }, [file]);

    const getStatusIcon = () => {
        switch (status) {
            case "uploading":
                return <Loader2 className="size-4 animate-spin" />;
            case "error":
                return <AlertCircle className="size-4 text-red-500" />;
            default:
                return null;
        }
    };

    const FileContent = () => {
        const fileType = file.type.split("/")[0];

        if (fileType === "image" && fileContent) {
            return <img src={typeof fileContent === 'string' ? fileContent : ''} className="object-cover bg-secondary size-full" alt={file.name} />;
        }
        if (fileType === "audio") {
            return <FileAudio />;
        }
        return <FileIcon />;
    };

    return (
        <Tooltippy
            content={status === "error" ? (
                <span className="text-red-500">Failed to upload: {error}</span>
            ) : (
                file.name
            )}
        >
            <motion.div
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                initial={{ opacity: 0, y: 10 }}
                className="size-11 flex border items-center justify-center group rounded-lg shrink-0 overflow-hidden relative"
            >
                <div className="absolute inset-0 flex items-center justify-center">
                    {getStatusIcon()}
                </div>
                <button
                    className="absolute p-0.5 rounded-full bg-black/20 text-foreground right-0.5 bottom-0.5 z-10"
                    onClick={onCancel}
                >
                    <XIcon className="size-3" />
                </button>
                <div className={status === "uploading" ? "opacity-50" : ""}>
                    <FileContent />
                </div>
            </motion.div>
        </Tooltippy>
    );

}

const enableCompletions = false;

export function ChatFooter() {
    const { collectUserData, http } = useConfigData();
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const { sendMessage, hookState, session } = useChat();
    const { contact } = useContact();
    const locale = useLocale();

    const { inputText, setInputText, completions, setCompletions } = useChatCompletions(
        async (input) => {
            if (enableCompletions) {
                if (session) return null;
                const resp = await http.apis.getCompletions(input);
                return resp.data.completions || [];
            }
            return null
        },
        700
    );

    const { allFiles, emptyTheFiles, handleCancelUpload, appendFiles, isUploading, successFiles } = useUploadFiles();

    const shouldAcceptAttachments = session && (session?.isAssignedToHuman || session.ai_closure_type === AIClosureType.handed_off);

    const handleFileDrop = (acceptedFiles: File[]) => {
        if (!shouldAcceptAttachments) {
            return;
        }
        appendFiles(acceptedFiles);
    };

    const handleSubmit = async (text: string) => {
        if (hookState.state === "loading") return;
        if (isUploading) {
            toast.error('please wait for the file(s) to upload')
        }
        if (!text.trim()) return;

        await sendMessage({
            content: {
                text: text.trim(),
            },
            user: {
                email: contact?.email ?? undefined,
                name: contact?.name ?? undefined,
            },
            attachments: successFiles.map(f => ({
                url: f.fileUrl!,
                type: f.file.type,
                name: f.file.name,
                id: f.id,
                size: f.file.size
            }))
        });

        setInputText("");
        emptyTheFiles();
    };

    const { getRootProps, getInputProps, open: openFileSelect } = useDropzone({
        onDrop: handleFileDrop,
        noClick: true,
        onDropRejected() {
            if (shouldAcceptAttachments) {
                toast.error('unsupported file type, or the file is too large')
            }
        },
        maxSize: 5 * 1024 * 1024,
        accept: {
            'text/*': ['.txt'],
            'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
            'application/pdf': ['.pdf'],
        }
    });

    const [containerRef, dimensions] = useMeasure<HTMLDivElement>();
    const [showCompletions, setShowCompletions] = useState(false);
    const isLoading = hookState.state === "loading";

    const shouldCollectDataFirst = collectUserData && !contact?.id;

    const handlePaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
        const clipboardData = event.clipboardData;
        if (!clipboardData) return;
        if (clipboardData.files.length > 0) {
            handleFileDrop(Array.from(clipboardData.files));
        }
    }

    return (
        <div className="p-2 relative space-y-1" {...getRootProps()}>
            <input {...getInputProps()} />
            <Popover.Root
                open={showCompletions && completions.length > 0}>
                <Command loop>
                    <Popover.Anchor asChild>
                        <div className="rounded-xl relative gap-2 border border-px border-zinc-200 transition-all shadow-sm">
                            {
                                allFiles.length > 0 && (
                                    <motion.div
                                        animate={{
                                            transition: {
                                                staggerChildren: 0.5,
                                                delayChildren: 0.5
                                            }
                                        }}
                                        className="flex items-center gap-0.5 p-1 border-b">
                                        {allFiles.map((file) => (
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
                                onPaste={handlePaste}
                                ref={inputRef}
                                id='chat-input'
                                dir="auto"
                                data-padding={dimensions.width}
                                disabled={isLoading || shouldCollectDataFirst}
                                value={inputText}
                                style={{
                                    paddingRight: `${dimensions.width}px`
                                }}
                                rows={3}
                                className={`outline-none w-full p-2 text-zinc-900 text-sm bg-transparent resize-none placeholder:text-zinc-400`}
                                onChange={e => setInputText(e.target.value)}
                                onFocus={() => setShowCompletions(true)}
                                onKeyDown={async (event) => {
                                    if (event.key === "Enter" && !event.shiftKey) {
                                        event.preventDefault();
                                        handleSubmit(inputText);
                                    }
                                }}
                                placeholder={locale.get("write-a-message")}
                            />
                            <div
                                ref={containerRef}
                                className="absolute space-x-1 bottom-1.5 right-1.5 w-fit">
                                {
                                    shouldAcceptAttachments && (
                                        <Tooltippy
                                            position="top-end"
                                            content="attach files, (maximum size 5mb)"
                                        >
                                            <Button
                                                onClick={openFileSelect}
                                                size='fit' variant={"outline"}>
                                                <PaperclipIcon className="size-4" />
                                            </Button>
                                        </Tooltippy>
                                    )
                                }
                                <Tooltippy
                                    content="send message"
                                >
                                    <Button
                                        size='fit'
                                        onClick={() => {
                                            handleSubmit(inputText);
                                        }}
                                        disabled={isLoading || shouldCollectDataFirst || isUploading}
                                        className="hover:brightness-90"
                                    >
                                        {isLoading ? (
                                            <CircleDashed className="size-4 animate-spin animate-iteration-infinite" />
                                        ) : (
                                            <SendHorizonal className="size-4 rtl:-scale-100" />
                                        )}
                                    </Button>
                                </Tooltippy>
                            </div>
                        </div>
                    </Popover.Anchor>
                    <CompletionsRender
                        completions={completions}
                        prefix={inputText}
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
                            handleSubmit(completion);
                        }}
                    />
                </Command>
            </Popover.Root>
        </div >
    );
}
