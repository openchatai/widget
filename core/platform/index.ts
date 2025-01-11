import { Logger } from './logger';
import type { Storage } from './storage';
import type { WidgetAudio } from './audio';
export * from './storage';
export * from './audio';
export type { Storage };
export type { WidgetAudio };

export interface Platform {
  storage?: Storage;
  logger?: Logger;
  audio?: WidgetAudio;
  env: {
    platform: string;
  };
}
