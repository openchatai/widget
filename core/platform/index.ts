import { Logger } from './logger';
export * from './storage';

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
