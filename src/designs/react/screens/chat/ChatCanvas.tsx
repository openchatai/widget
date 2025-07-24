import React from 'react';
import { useModes } from '../../../../headless/react';

export function ChatCanvas() {
  const { activeMode } = useModes();
  return (
    <div>
      <p>{activeMode?.name}</p>
    </div>
  );
}
