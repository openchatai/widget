import React from 'react';
import ReactMarkdown from 'react-markdown';

export const MemoizedReactMarkdown = React.memo(
  ReactMarkdown,
  (prev, next) =>
    prev.children === next.children && prev.className === next.className,
);
