import React from 'react';
import { useMode } from '../../hooks/useMode';

export function ChatCanvas() {
  const { mode } = useMode();
  return (
    <div>
      <p>{mode?.name}</p>
    </div>
  );
}
