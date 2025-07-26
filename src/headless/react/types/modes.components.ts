import type { ModeDto } from '../../core';

export type WidgetModeComponentType = {
  key: string;
  component: React.FC<{ mode: ModeDto }>;
};
