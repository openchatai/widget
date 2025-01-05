import {
  FileWithProgress,
  useChat,
  useConfigData,
  useContact,
  useLocale,
  useUploadFiles,
} from "@react/index";
import { Button } from "@ui/button";
import {
  AlertCircle,
  CircleDashed,
  FileAudio,
  FileIcon,
  Loader2,
  PaperclipIcon,
  SendHorizonal,
  XIcon,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Tooltippy } from "@ui/tooltip";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { AIClosureType } from "@core/types";
import { cn } from "src/utils";
import { MotionDiv } from "@ui/MotionDiv";

function FileDisplay({
  file: { status, file, error },
  onCancel,
}: {
  file: FileWithProgress;
  onCancel: () => void;
}) {
  const [fileContent, setFileContent] = useState<string | ArrayBuffer | null>(
    null,
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
        return <AlertCircle className="size-4 text-destructive" />;
      default:
        return null;
    }
  };

  const FileContent = () => {
    const fileType = file.type.split("/")[0];

    if (fileType === "image" && fileContent) {
      return (
        <img
          src={typeof fileContent === "string" ? fileContent : ""}
          className="object-cover bg-secondary size-full"
          alt={file.name}
        />
      );
    }
    if (fileType === "audio") {
      return <FileAudio />;
    }
    return <FileIcon />;
  };

  return (
    <Tooltippy
      content={
        status === "error" ? (
          <span className="text-destructive">Failed to upload: {error}</span>
        ) : (
          file.name
        )
      }
    >
      <div
        className={cn(
          status === "uploading" && "opacity-50",
          "group",
          "size-12 border rounded-2xl overflow-hidden relative",
          "flex items-center justify-center shrink-0",
        )}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {getStatusIcon()}
        </div>
        <button
          className={cn(
            "absolute bg-black/50 inset-0 size-full z-10 opacity-0",
            "flex items-center justify-center",
            "opacity-0 group-hover:opacity-100 transition",
          )}
          onClick={onCancel}
        >
          <XIcon className="size-4 text-primary-foreground" />
        </button>
        <FileContent />
      </div>
    </Tooltippy>
  );
}

const INPUT_CONTAINER_B_RADIUS = cn("rounded-3xl");

export function ChatFooter() {
  const { collectUserData } = useConfigData();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { sendMessage, hookState, session } = useChat();
  const { contact } = useContact();
  const locale = useLocale();

  const [inputText, setInputText] = useState("");

  const {
    allFiles,
    emptyTheFiles,
    handleCancelUpload,
    appendFiles,
    isUploading,
    successFiles,
  } = useUploadFiles();

  const shouldAcceptAttachments =
    session &&
    (session?.isAssignedToHuman ||
      session.ai_closure_type === AIClosureType.handed_off);

  const handleFileDrop = (acceptedFiles: File[]) => {
    if (!shouldAcceptAttachments) {
      return;
    }
    appendFiles(acceptedFiles);
  };

  const handleSubmit = async () => {
    if (hookState.state === "loading") return;
    if (isUploading) {
      // TODO use something other than toast
      toast.error("please wait for the file(s) to upload");
    }
    if (!inputText.trim()) return;

    setInputText("");
    emptyTheFiles();

    await sendMessage({
      content: {
        text: inputText.trim(),
      },
      user: {
        email: contact?.email ?? undefined,
        name: contact?.name ?? undefined,
      },
      attachments: successFiles.map((f) => ({
        url: f.fileUrl!,
        type: f.file.type,
        name: f.file.name,
        id: f.id,
        size: f.file.size,
      })),
    });
  };

  const {
    getRootProps: dropzone__getRootProps,
    getInputProps: dropzone__getInputProps,
    open: dropzone__openFileSelect,
  } = useDropzone({
    onDrop: handleFileDrop,
    noClick: true,
    onDropRejected() {
      if (shouldAcceptAttachments) {
        // TODO use something other than toast
        toast.error("unsupported file type, or the file is too large");
      }
    },
    maxSize: 5 * 1024 * 1024,
    accept: {
      "text/*": [".txt"],
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
      "application/pdf": [".pdf"],
    },
  });

  const isLoading = hookState.state === "loading";

  const shouldCollectDataFirst = collectUserData && !contact?.id;

  const handlePaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const clipboardData = event.clipboardData;
    if (!clipboardData) return;
    if (clipboardData.files.length > 0) {
      handleFileDrop(Array.from(clipboardData.files));
    }
  };

  return (
    <div className="p-2 relative space-y-1" {...dropzone__getRootProps()}>
      <input {...dropzone__getInputProps()} />
      <div
        className={cn(
          INPUT_CONTAINER_B_RADIUS,
          "relative space-y-2 border transition-all shadow py-2",
        )}
      >
        <div className="flex items-center gap-1 px-2">
          <AnimatePresence mode="popLayout">
            {allFiles.map((file) => (
              <MotionDiv key={file.id} snapExit>
                <FileDisplay
                  onCancel={() => handleCancelUpload(file.id)}
                  file={file}
                />
              </MotionDiv>
            ))}
          </AnimatePresence>
        </div>
        <textarea
          onPaste={handlePaste}
          ref={inputRef}
          id="chat-input"
          dir="auto"
          disabled={isLoading}
          value={inputText}
          rows={3}
          className={cn(
            /** Match the border radius of the container */
            INPUT_CONTAINER_B_RADIUS,
            "w-full px-3",
            "resize-none",
            "bg-transparent outline-none",
            "text-sm",
          )}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={async (event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              handleSubmit();
            }
          }}
          placeholder={locale.get("write-a-message")}
        />
        <div className="px-2 flex justify-between">
          <Tooltippy
            side="top"
            align="end"
            // TODO translation
            content="attach files, (maximum size 5mb)"
          >
            <Button
              onClick={() => {
                if (!shouldAcceptAttachments) return;
                dropzone__openFileSelect();
              }}
              size="fit"
              variant="outline"
              className={cn(
                "disabled:opacity-0",
                "rounded-full size-8 flex items-center justify-center p-0",
              )}
              disabled={!shouldAcceptAttachments}
            >
              <PaperclipIcon className="size-4" />
            </Button>
          </Tooltippy>

          <Tooltippy
            // TODO translation
            content="send message"
          >
            <Button
              size="fit"
              onClick={handleSubmit}
              disabled={isLoading || shouldCollectDataFirst || isUploading}
              className="rounded-full size-8 flex items-center justify-center p-0"
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
    </div>
  );
}
