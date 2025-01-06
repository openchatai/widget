export * from './storage';

export interface Platform {
  storage?: Storage;
  env: {
    platform: string;
  };
  date: {
    now(): number;
    toISOString(date: number): string;
  };
}