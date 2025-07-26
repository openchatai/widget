import type { MessageCtx, ModeDto, SessionCtx } from '../../core';

export type WidgetModeComponentProps = {
  mode: ModeDto;
  createStateCheckpoint: SessionCtx['createStateCheckpoint'];
  sendMessage: MessageCtx['sendMessage'];
  isSendingMessage: boolean;
};

export type WidgetModeComponentType = {
  key: string;
  component: React.FC<WidgetModeComponentProps>;
};
