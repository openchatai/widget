import { AnimatePresence } from 'framer-motion';
import {
  AlertCircle,
  CheckCheckIcon,
  CircleDashed,
  FileAudio2Icon,
  FileIcon,
  FileVideo2Icon,
  ImageIcon,
  Loader2,
  PaperclipIcon,
  SendHorizonal,
  XIcon,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  useIsAwaitingBotReply,
  useMessages,
  usePreludeData,
  useSessions,
  useUploadFiles,
  useWidget,
  type FileWithProgress,
} from '../../../../headless/react';
import { Tooltippy } from '../../components/lib/tooltip';
import { cn } from '../../components/lib/utils/cn';
import { useLocale } from '../../hooks/useLocale';
import { MotionDiv } from '../../components/lib/MotionDiv';
import { Button } from '../../components/lib/button';
import { useDocumentDir } from '../../../../headless/react/hooks/useDocumentDir';
import { SuggestedReplies } from '../../components/SuggestedReplies';
import type { SendMessageDto } from '../../../../headless/core';

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
    if (!file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = () => setFileContent(reader.result as string);
    reader.onerror = () => console.error('Error reading file');
    reader.readAsDataURL(file);

    return () => reader.abort();
  }, [file]);

  const getStatusIcon = () => {
    switch (status) {
      case 'uploading':
        return <Loader2 className="size-4 animate-spin" />;
      case 'error':
        return <AlertCircle className="size-4 text-destructive" />;
      default:
        return null;
    }
  };

  const FileContent = () => {
    const fileType = file.type.split('/')[0];

    if (fileType === 'image' && fileContent) {
      return (
        <img
          src={typeof fileContent === 'string' ? fileContent : ''}
          className="object-cover bg-secondary size-full"
          alt={file.name}
        />
      );
    }
    if (fileType === 'audio') {
      return <FileAudio2Icon />;
    }
    if (fileType === 'video') {
      return <FileVideo2Icon />;
    }
    return <FileIcon />;
  };

  return (
    <Tooltippy
      side="bottom"
      content={
        status === 'error' ? (
          <span className="text-destructive">Failed to upload: {error}</span>
        ) : (
          file.name
        )
      }
    >
      <div
        className={cn(
          status === 'uploading' && 'opacity-50',
          'group',
          'size-12 border rounded-2xl overflow-hidden relative',
          'flex items-center justify-center shrink-0',
        )}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {getStatusIcon()}
        </div>
        <button
          type="button"
          className={cn(
            'absolute bg-black/50 inset-0 size-full z-10 opacity-0',
            'flex items-center justify-center',
            'opacity-0 group-hover:opacity-100 transition',
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

const INPUT_CONTAINER_B_RADIUS = cn('rounded-3xl');

function ChatInput() {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { sendMessage } = useMessages();
  const { sessionState } = useSessions();
  const locale = useLocale();
  const dir = useDocumentDir();
  const [inputText, setInputText] = useState('');

  const {
    allFiles,
    emptyTheFiles,
    handleCancelUpload,
    appendFiles,
    isUploading,
    successFiles,
  } = useUploadFiles();

  const isHandedOff = !!sessionState.session?.isHandedOff;

  const { isAwaitingBotReply } = useIsAwaitingBotReply();

  const handleFileDrop = (acceptedFiles: File[]) => {
    appendFiles(acceptedFiles);
  };

  const cannotSend = !inputText.trim() && successFiles.length === 0;

  const handleSubmit = async () => {
    if (isAwaitingBotReply) return;
    if (cannotSend) return;

    if (isUploading) {
      // TODO use something other than toast
      const message = 'please wait for the file(s) to upload';
      console.info(message);
    }
    const trimmed = inputText.trim();

    // Do not await this
    void sendMessage({
      content: trimmed,
      attachments: successFiles.flatMap((f) =>
        f.fileUrl
          ? [
              {
                url: f.fileUrl,
                type: f.file.type,
                name: f.file.name,
                id: f.id,
                size: f.file.size,
              } satisfies NonNullable<SendMessageDto['attachments']>[number],
            ]
          : [],
      ),
    });

    setInputText('');
    emptyTheFiles();
  };

  const {
    getRootProps: dropzone__getRootProps,
    getInputProps: dropzone__getInputProps,
    open: dropzone__openFileSelect,
  } = useDropzone({
    onDrop: handleFileDrop,
    noClick: true,
    onDropRejected() {
      // TODO use something other than toast
      const message = 'unsupported file type, or the file is too large';
      console.error(message);
    },
    maxSize: 5 * 1024 * 1024,
    accept: isHandedOff
      ? {
          'text/*': ['.txt'],
          'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
          'application/pdf': ['.pdf'],
        }
      : {
          'image/png': ['.png'],
          'image/jpeg': ['.jpg', '.jpeg'],
          'image/gif': ['.gif'],
          'image/webp': ['.webp'],
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
          'relative space-y-2 border transition-all shadow py-2',
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
          dir={dir}
          value={inputText}
          rows={3}
          className={cn(
            /** Match the border radius of the container */
            INPUT_CONTAINER_B_RADIUS,
            'w-full resize-none px-3',
            'text-sm rtl:placeholder:text-right bg-transparent outline-none',
          )}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={async (event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault();
              handleSubmit();
            }
          }}
          placeholder={locale.get('write-a-message')}
        />
        <div dir={dir} className="px-2 flex justify-between rtl:text-right">
          <Tooltippy
            side="top"
            align="start"
            content="attach files, (maximum size 5mb)"
          >
            <Button
              onClick={dropzone__openFileSelect}
              size="fit"
              variant="outline"
              className={cn(
                'rounded-full size-8 flex items-center justify-center p-0 overflow-hidden',
              )}
            >
              <AnimatePresence mode="wait">
                {isHandedOff ? (
                  <MotionDiv key="paper-clip">
                    <PaperclipIcon className="size-4" />
                  </MotionDiv>
                ) : (
                  <MotionDiv key="image-icon">
                    <ImageIcon className="size-4" />
                  </MotionDiv>
                )}
              </AnimatePresence>
            </Button>
          </Tooltippy>

          <Tooltippy content="send message" side="top" align="end">
            <Button
              size="fit"
              onClick={handleSubmit}
              disabled={isAwaitingBotReply || isUploading || cannotSend}
              className="rounded-full size-8 flex items-center justify-center p-0"
            >
              <AnimatePresence mode="wait">
                {isAwaitingBotReply || isUploading ? (
                  <MotionDiv key="loading" snapExit>
                    <CircleDashed className="size-4 animate-spin animate-iteration-infinite" />
                  </MotionDiv>
                ) : (
                  <MotionDiv key="send" snapExit>
                    <SendHorizonal className="size-4 rtl:-scale-100" />
                  </MotionDiv>
                )}
              </AnimatePresence>
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
    <div className="p-2">
      <div className="p-2 bg-background rounded-3xl border shadow-2xl space-y-2">
        <div className="flex items-center gap-1">
          <CheckCheckIcon className="size-4 text-emerald-500" />
          <h2 className="text-sm font-medium" dir="auto">
            {locale.get('session-closed-lead')}
          </h2>
        </div>

        <div>
          <Button onClick={widgetCtx.resetChat} className="rounded-2xl w-full">
            {locale.get('new-conversation')}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function ChatFooter() {
  const { sessionState } = useSessions();
  const { messagesState, sendMessage } = useMessages();

  const preludeSWR = usePreludeData();
  const initialQuestions = preludeSWR.data?.data?.initialQuestions;
  const noMessages = messagesState.messages.length === 0;

  return (
    <footer>
      <div>
        <AnimatePresence mode="wait">
          {sessionState.session && !sessionState.session?.isOpened ? (
            <MotionDiv
              key="session-closed"
              className="overflow-hidden"
              overrides={{
                initial: { height: 0 },
                animate: { height: 'auto' },
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
                animate: { height: 'auto' },
                exit: { height: 0 },
              }}
            >
              {messagesState.lastAIResMightSolveUserIssue && (
                <SuggestedReplies />
              )}

              {noMessages && initialQuestions && (
                <div className="flex items-center flex-row justify-end gap-2 flex-wrap px-2">
                  {initialQuestions?.map((iq) => (
                    <Button
                      key={iq}
                      dir="auto"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        sendMessage({ content: iq });
                      }}
                    >
                      {iq}
                    </Button>
                  ))}
                </div>
              )}

              <ChatInput />
            </MotionDiv>
          )}
        </AnimatePresence>
      </div>
    </footer>
  );
}
