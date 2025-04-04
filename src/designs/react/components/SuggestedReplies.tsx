import React from 'react';
import { Button } from './lib/button';
import { useLocale } from '../hooks/useLocale';
import { useMessages } from '../../../headless/react';

export function SuggestedReplies() {
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
        <Button
          onClick={() => handleSend(option)}
          className="flex-1 rounded-full"
          size="sm"
          key={option}
        >
          {option}
        </Button>
      ))}
    </div>
  );
}
