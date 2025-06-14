import React from 'react';
import { useMessages } from '../../../headless/react';
import { useLocale } from '../hooks/useLocale';
import { SuggestedReplyButton } from './SuggestedReplyButton';

export function MightSolveUserIssueSuggestedReplies() {
  const { sendMessage } = useMessages();
  const locale = useLocale();
  const options = [
    locale.get('i-need-more-help'),
    locale.get('this-was-helpful'),
  ];

  const handleSend = (option: string) => {
    const trimmed = option.trim();
    if (!trimmed) return;
    sendMessage({ content: trimmed });
  };

  return (
    <div className="flex items-center gap-2 p-2 pb-0 flex-wrap">
      {options.map((option) => (
        <SuggestedReplyButton
          key={option}
          onClick={() => handleSend(option)}
          className="flex-1"
        >
          {option}
        </SuggestedReplyButton>
      ))}
    </div>
  );
}
