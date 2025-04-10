import React from 'react';
import { cn } from '../lib/utils/cn';

export function ChatBubbleSvg({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width="32"
      height="30"
      viewBox="0 0 32 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('text-primary-foreground', className)}
      style={style}
    >
      <title>Chat Bubble</title>
      <path
        d="M0 6.94263C0 3.62892 2.68629 0.942627 6 0.942627H26C29.3137 0.942627 32 3.62892 32 6.94263V17.9426C32 21.2563 29.3137 23.9426 26 23.9426H6C2.68629 23.9426 0 21.2563 0 17.9426V6.94263Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.9945 23.8935L26.237 23.8934C26.1982 24.3557 26.1712 25.2778 26.1704 26.2318C26.1688 28.2839 26.1376 28.7041 25.974 28.868C25.583 29.2598 25.2686 29.0967 24.0616 27.8754C23.4162 27.2222 22.1141 25.9522 21.1682 25.0531L19.9945 23.8935Z"
        fill="currentColor"
      />
    </svg>
  );
}
