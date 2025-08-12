import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { SuggestedReplyButton } from './SuggestedReplyButton';
import { dc } from '../utils/data-component';

export function MightSolveUserIssueSuggestedReplies() {
  const locale = useTranslation();
  const options = [
    locale.get('i-need-more-help'),
    locale.get('this-was-helpful'),
  ];

  return (
    <div
      {...dc('chat/might_solve_user_issue_suggested_replies_container')}
      className="flex items-center gap-2 p-2 pb-0 flex-wrap"
    >
      {options.map((option) => (
        <SuggestedReplyButton
          key={option}
          suggestion={option}
          className="flex-1"
        />
      ))}
    </div>
  );
}
