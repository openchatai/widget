import { useSessions } from '../../../headless/react';

export function useMode() {
  const { sessionState } = useSessions();

  const mode = sessionState.session?.mode;

  return {
    mode,
  };
}
