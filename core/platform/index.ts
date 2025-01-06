import { Logger } from './logger';
import type { Storage } from './storage';
export * from './storage';
export type { Storage };
export interface Platform {
  storage?: Storage;
  logger?: Logger;
  env: {
    platform: string;
  };
  date: {
    now(): number;
    toISOString(date: number): string;
  };
}
