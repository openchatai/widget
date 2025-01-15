import { Button } from "@ui/button";
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
import { Tooltippy } from "@ui/tooltip";
import { AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { cn } from "src/utils";
import { MotionDiv } from "@ui/MotionDiv";
import {
  FileWithProgress,
  useChat,
  useConfig,
  useLocale,
  useUploadFiles,
} from "@react/core-integration";
import { usePubsub } from "@react/core-integration/hooks/usePubsub";
import { genUuid } from "@core/utils/genUuid";

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

function ChatInput() {
  const { config } = useConfig();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { chat } = useChat();
  const session = usePubsub(chat.sessionState);
  const chatState = usePubsub(chat.chatState);
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
    session && (session?.isHandedOff || session.assignee.kind === "human");

  const isSendingMessage =
    chatState.loading.isLoading &&
    (chatState.loading.reason === "sending_message_to_bot" ||
      chatState.loading.reason === "sending_message_to_agent");

  const handleFileDrop = (acceptedFiles: File[]) => {
    if (!shouldAcceptAttachments) {
      return;
    }
    appendFiles(acceptedFiles);
  };

  const handleSubmit = async () => {
    if (isSendingMessage) return;

    if (isUploading) {
      // TODO use something other than toast
      const message = "please wait for the file(s) to upload";
      toast.error(message);
      console.info(message);
    }
    if (!inputText.trim()) return;

    setInputText("");
    emptyTheFiles();

    await chat.sendMessage({
      content: inputText.trim(),
      // user: {
      //   email: contact?.email ?? undefined,
      //   name: contact?.name ?? undefined,
      // },
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
            align="start"
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
            side="top"
            align="end"
          >
            <Button
              size="fit"
              onClick={handleSubmit}
              disabled={isSendingMessage || isUploading}
              className="rounded-full size-8 flex items-center justify-center p-0"
            >
              {isSendingMessage ? (
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

function SessionClosedSection() {
  const { chat } = useChat();
  const locale = useLocale();

  return (
    <div className="p-2">
      <div className="p-2 bg-background rounded-3xl border shadow-2xl space-y-2">
        <div className="flex items-center gap-1">
          <CheckCheckIcon className="size-4 text-emerald-500" />
          <h2 className="text-sm font-medium" dir="auto">
            {locale.get("session-closed-lead")}
          </h2>
        </div>

        <div>
          <Button onClick={chat.recreateSession} className="rounded-2xl w-full">
            {locale.get("create-new-ticket")}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function ChatFooter() {
  const { chat } = useChat();
  const session = usePubsub(chat.sessionState);

  return (
    <div>
      <AnimatePresence mode="wait">
        {session && !session.isOpened ? (
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
