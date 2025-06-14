import React from 'react';
import remarkGfm from 'remark-gfm';
import { MemoizedReactMarkdown } from '../markdown';
import rehypeRaw from 'rehype-raw';
import { AttachmentPreview } from '../AttachmentPreview';
import type { WidgetComponentProps } from '../../../../headless/react/types/components';
import { cn } from '../lib/utils/cn';
import { useConfig } from '../../../../headless/react';
import { OpenCxComponentName } from '../../../../headless/core';

export function BotOrAgentResponse({
  data,
  id,
  type,
  attachments,
}: WidgetComponentProps) {
  const { anchorTarget } = useConfig();
  const { message, variant = 'default' } = data;

  if (variant === 'error') {
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
        <div
          data-component={
            OpenCxComponentName['chat-screen__agent-or-bot-message']
          }
          className={cn(
            'w-fit py-2 px-3 rounded-2xl bg-secondary border shadow-sm',
            'leading-snug text-sm prose prose-sm prose-a:decoration-primary prose-a:underline',
            'break-words [word-break:break-word]', // `[word-break:break-word]` is deprecated but works in the browser, while `break-words` which is `[overflow-wrap: break-word]` does not work
            // No need to add "whitespace-pre-wrap" in the agent or bot message because it is markup and content appear on separate lines as expected
            // Adding "whitespace-pre-wrap" will result in unnecessarily huge line breaks
          )}
        >
          <MemoizedReactMarkdown
            data-type={type}
            data-id={id}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              a: ({ children, ...props }) => {
                return (
                  <a target={anchorTarget ?? '_top'} {...props}>
                    {children}
                  </a>
                );
              },
            }}
            // Do not pass className directly to ReactMarkdown component because that will create a container div wrapping the rich text
          >
            {message}
          </MemoizedReactMarkdown>
        </div>
      )}
    </div>
  );
}
