import type { Storage } from './storage';
import type { Audio } from './audio';
import type { Logger } from './logger';

export * from './storage';
export * from './logger';
export * from './audio';

export type { Storage, Audio, Logger };

export interface Platform {
  storage?: Storage;
  logger: Logger;
  env: {
    platform: string;
  };
  audio?: Audio;
}
