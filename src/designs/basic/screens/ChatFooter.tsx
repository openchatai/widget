import { FileWithProgress, useChat, useConfigData, useContact, useLocale, useUploadFiles } from "@react/index";
import { Button } from "@ui/button";
import { AlertCircle, CircleDashed, FileAudio, FileIcon, Loader2, PaperclipIcon, SendHorizonal, XIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import useMeasure from "react-use/lib/useMeasure";
import { useDropzone } from 'react-dropzone';
import { Tooltippy } from "@ui/tooltip";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { AIClosureType } from "@core/types";

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

export function ChatFooter() {
    const { collectUserData } = useConfigData();
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const { sendMessage, hookState, session } = useChat();
    const { contact } = useContact();
    const locale = useLocale();

    const [inputText, setInputText] = useState('');

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
                    disabled={isLoading}
                    value={inputText}
                    style={{
                        paddingRight: `${dimensions.width}px`
                    }}
                    rows={3}
                    className={`outline-none w-full p-2 text-zinc-900 text-sm bg-transparent resize-none placeholder:text-zinc-400`}
                    onChange={e => setInputText(e.target.value)}
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
        </div >
    );
}
