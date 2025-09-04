import React from 'react';
import remarkGfm from 'remark-gfm';
import { MemoizedReactMarkdown } from './MemoizedReactMarkdown';
import rehypeRaw from 'rehype-raw';
import { useConfig } from '@opencx/widget-react-headless';

export function RichText({
  children,
  messageType,
  messageId,
}: {
  children: string;
  messageType?: string;
  messageId?: string;
}) {
  const { anchorTarget } = useConfig();

  return (
    <MemoizedReactMarkdown
      data-type={messageType}
      data-id={messageId}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        a: ({ children, ...props }) => {
          return (
            <a target={props.target || anchorTarget || '_top'} {...props}>
              {children}
            </a>
          );
        },
      }}
      // Do not pass className directly to ReactMarkdown component because that will create a container div wrapping the rich text
    >
      {children}
    </MemoizedReactMarkdown>
  );
}
