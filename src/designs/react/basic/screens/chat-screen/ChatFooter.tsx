import { AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  CheckCheckIcon,
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
import toast from "react-hot-toast";
import { MotionDiv } from "src/designs/react/components/lib/MotionDiv";
import { Button } from "src/designs/react/components/lib/button";
import { Tooltippy } from "src/designs/react/components/lib/tooltip";
import { cn } from "src/designs/react/components/lib/utils/cn";
import { useLocale } from "src/designs/react/hooks/useLocale";
import {
  FileWithProgress,
  useIsAwaitingBotReply,
  useMessages,
  useSession,
  useUploadFiles,
  useWidget,
} from "src/headless/react";

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
      side="bottom"
      content={
        status === "error" ? (
          <span className="text-destructive">Failed to upload: {error}</span>
        ) : (
          file.name
        )
      }
    >
      <div
        data-test="file-display"
        className={cn(
          status === "uploading" && "opacity-50",
          "group",
          "size-12 border rounded-2xl overflow-hidden relative",
          "flex items-center justify-center shrink-0",
        )}
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          data-test="file-status"
        >
          {getStatusIcon()}
        </div>
        <button
          data-test="file-cancel-button"
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

function ChatInput() {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { messageCtx } = useMessages();
  const { session } = useSession();
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

  const shouldAcceptAttachments = !!session.session?.isHandedOff;

  const { isAwaitingBotReply } = useIsAwaitingBotReply();

  const handleFileDrop = (acceptedFiles: File[]) => {
    if (!shouldAcceptAttachments) {
      return;
    }
    appendFiles(acceptedFiles);
  };

  const handleSubmit = async () => {
    if (isAwaitingBotReply) return;

    if (isUploading) {
      // TODO use something other than toast
      const message = "please wait for the file(s) to upload";
      toast.error(message);
      console.info(message);
    }
    const trimmed = inputText.trim();
    if (!trimmed) return;

    setInputText("");
    emptyTheFiles();

    await messageCtx.sendMessage({
      content: trimmed,
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
        const message = "unsupported file type, or the file is too large";
        toast.error(message);
        console.error(message);
      }
    },
    maxSize: 5 * 1024 * 1024,
    accept: {
      "text/*": [".txt"],
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
      "application/pdf": [".pdf"],
    },
  });

  const handlePaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const clipboardData = event.clipboardData;
    if (!clipboardData) return;
    if (clipboardData.files.length > 0) {
      handleFileDrop(Array.from(clipboardData.files));
    }
  };

  return (
    <div
      className="p-2 relative space-y-1"
      {...dropzone__getRootProps()}
      data-test="chat-input-container"
    >
      <input {...dropzone__getInputProps()} />
      <div
        className={cn(
          INPUT_CONTAINER_B_RADIUS,
          "relative space-y-2 border transition-all shadow py-2",
        )}
        data-test="chat-input-wrapper"
      >
        <div
          className="flex items-center gap-1 px-2"
          data-test="file-attachments-container"
        >
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
          value={inputText}
          rows={3}
          data-test="chat-message-input"
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
        <div
          className="px-2 flex justify-between"
          data-test="chat-input-actions"
        >
          <Tooltippy
            side="top"
            align="start"
            content="attach files, (maximum size 5mb)"
          >
            <Button
              onClick={() => {
                if (!shouldAcceptAttachments) return;
                dropzone__openFileSelect();
              }}
              size="fit"
              variant="outline"
              data-test="attach-file-button"
              className={cn(
                "disabled:opacity-0",
                "rounded-full size-8 flex items-center justify-center p-0",
              )}
              disabled={!shouldAcceptAttachments}
            >
              <PaperclipIcon className="size-4" />
            </Button>
          </Tooltippy>

          <Tooltippy content="send message" side="top" align="end">
            <Button
              size="fit"
              onClick={handleSubmit}
              disabled={isAwaitingBotReply || isUploading}
              data-test="send-message-button"
              className="rounded-full size-8 flex items-center justify-center p-0"
            >
              {isAwaitingBotReply ? (
                <CircleDashed
                  className="size-4 animate-spin animate-iteration-infinite"
                  data-test="sending-message-indicator"
                />
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

function SessionClosedSection() {
  const { widgetCtx } = useWidget();
  const locale = useLocale();

  return (
    <div className="p-2" data-test="session-closed-container">
      <div
        className="p-2 bg-background rounded-3xl border shadow-2xl space-y-2"
        data-test="session-closed-content"
      >
        <div
          className="flex items-center gap-1"
          data-test="session-closed-header"
        >
          <CheckCheckIcon className="size-4 text-emerald-500" />
          <h2 className="text-sm font-medium" dir="auto">
            {locale.get("session-closed-lead")}
          </h2>
        </div>

        <div>
          <Button
            onClick={widgetCtx.resetChat}
            className="rounded-2xl w-full"
            data-test="create-new-ticket-button"
          >
            {locale.get("create-new-ticket")}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function ChatFooter() {
  const { session } = useSession();

  return (
    <div>
      <AnimatePresence mode="wait">
        {session.session && !session.session?.isOpened ? (
          <MotionDiv
            key="session-closed"
            className="overflow-hidden"
            overrides={{
              initial: { height: 0 },
              animate: { height: "auto" },
              exit: { height: 0 },
            }}
          >
            <SessionClosedSection />
          </MotionDiv>
        ) : (
          <MotionDiv
            key="chat-input"
            className="overflow-hidden"
            overrides={{
              initial: { height: 0 },
              animate: { height: "auto" },
              exit: { height: 0 },
            }}
          >
            <ChatInput />
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  );
}
