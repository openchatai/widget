import React from "react";
import remarkGfm from "remark-gfm";
import { MemoizedReactMarkdown } from "../markdown";
import rehypeRaw from "rehype-raw";
import { AttachmentPreview } from "../AttachmentPreview";
import type { WidgetComponentProps } from "../../../../headless/react/types/components";
import { cn } from "../lib/utils/cn";

export function BotOrAgentResponse({
  data,
  id,
  type,
  attachments,
}: WidgetComponentProps) {
  const { message, variant = "default" } = data;

  if (variant === "error") {
    return (
      <div>
        <div className="flex flex-row flex-wrap items-center justify-start">
          <div className="leading-snug text-sm text-destructive">{message}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-5/6 flex flex-col items-start gap-1">
      <div className="w-full gap-1 flex flex-row flex-wrap items-center justify-start">
        {attachments?.map((attachment) => {
          return (
            <AttachmentPreview attachment={attachment} key={attachment.id} />
          );
        })}
      </div>
      {message.length > 0 && (
        <MemoizedReactMarkdown
          data-type={type}
          data-id={id}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            a: ({ children, ...props }) => {
              return (
                <a target="_top" {...props}>
                  {children}
                </a>
              );
            },
          }}
          className={cn(
            "w-fit p-2 rounded-2xl bg-secondary border shadow-sm",
            "leading-snug text-sm prose prose-sm prose-a:decoration-primary prose-a:underline",
            "break-all", // necessary to break very long words
          )}
        >
          {message}
        </MemoizedReactMarkdown>
      )}
    </div>
  );
}
