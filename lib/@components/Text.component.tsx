import React from "react";
import { ComponentProps } from "@lib/types";
import remarkGfm from "remark-gfm";
import { MemoizedReactMarkdown } from "./markdown";
import rehypeRaw from 'rehype-raw'
import { RenderAttachment } from "@ui/RenderFile";

export type DefaultTextComponentProps = ComponentProps<{
  message: string;
}>;

export function BotTextResponse({
  data,
  id,
  type,
  attachments,
}: DefaultTextComponentProps) {
  return (
    <div>
      <div
        className="gap-0.5 flex flex-row flex-wrap items-center justify-start"
      >
        {attachments?.map((attachment) => {
          return <RenderAttachment attachment={attachment} key={attachment.id} />
        })}
      </div>
      <MemoizedReactMarkdown
        data-type={type}
        data-id={id}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          a: ({ children, ...props }) => {
            return <a target="_top" {...props}>
              {children}
            </a>
          }
        }}
        className="leading-snug font-medium text-sm prose prose-a:decoration-primary prose-a:underline prose-sm prose-slate"
      >
        {data.message}
      </MemoizedReactMarkdown>
    </div>
  );
}
