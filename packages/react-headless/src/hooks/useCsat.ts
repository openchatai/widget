import type {
  WidgetSystemMessage__CsatRequested,
  WidgetSystemMessage__CsatSubmitted,
} from '@opencx/widget-core';
import { useMemo } from 'react';
import { useMessages } from './useMessages';
import { useWidget } from '../WidgetProvider';

export function useCsat() {
  const { widgetCtx } = useWidget();
  const {
    messagesState: { messages },
  } = useMessages();

  const {
    csatRequestedMessage,
    isCsatRequested,
    csatSubmittedMessage,
    isCsatSubmitted,
    submittedScore,
    submittedFeedback,
  } = useMemo(() => {
    const csatRequestedMessage = messages.find(
      (message): message is WidgetSystemMessage__CsatRequested =>
        message.type === 'SYSTEM' && message.subtype === 'csat_requested',
    );
    const csatSubmittedMessage = messages.findLast(
      (message): message is WidgetSystemMessage__CsatSubmitted =>
        message.type === 'SYSTEM' && message.subtype === 'csat_submitted',
    );

    return {
      csatRequestedMessage,
      isCsatRequested: !!csatRequestedMessage && !csatSubmittedMessage,
      csatSubmittedMessage,
      isCsatSubmitted: !!csatSubmittedMessage,
      submittedScore: csatSubmittedMessage?.data.payload.score,
      submittedFeedback: csatSubmittedMessage?.data.payload.feedback,
    };
  }, [messages]);

  return {
    submitCsat: widgetCtx.csatCtx.submitCsat,
    csatRequestedMessage,
    isCsatRequested,
    csatSubmittedMessage,
    isCsatSubmitted,
    submittedScore,
    submittedFeedback,
  };
}
