import React from 'react';
import { useModes } from '../../../../headless/react';

export function ChatCanvas() {
  const { activeMode, Component } = useModes();

  if (!Component || !activeMode) return null;

  return <Component mode={activeMode} />;
}
