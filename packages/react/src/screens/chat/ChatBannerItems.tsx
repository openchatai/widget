import React from 'react';
import { useMessages, useConfig } from '@opencx/widget-react-headless';
import { RichText } from '../../components/RichText';

export function ChatBannerItems() {
  const {
    messagesState: { messages },
  } = useMessages();
  const { chatBannerItems } = useConfig();

  if (!chatBannerItems?.length) return null;
  if (
    messages.length > 0 &&
    chatBannerItems.every((item) => !item.persistent)
  ) {
    return null;
  }

  return (
    <div className="w-full text-center text-xs">
      {chatBannerItems.map(({ message, persistent }, index) =>
        messages.length > 0 && !persistent ? null : (
          <div key={`${message}-${index}`}>
            <RichText>{message}</RichText>
          </div>
        ),
      )}
    </div>
  );
}
