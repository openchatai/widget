export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface Logger {
    debug(message: string, ...args: any[]): void;
    info(message: string, ...args: any[]): void;
    warn(message: string, ...args: any[]): void;
    error(message: string, ...args: any[]): void;
    setLevel(level: LogLevel): void;
}

export type LoggerOptions = {
    level?: LogLevel;
    prefix?: string;
    enabled?: boolean;
};

export function createLogger(options: LoggerOptions = {}): Logger {
    const {
        level = 'info',
        prefix = '[openCx]',
        enabled = true
    } = options;

    let currentLevel = level;
    const levels: Record<LogLevel, number> = {
        debug: 0,
        info: 1,
        warn: 2,
        error: 3
    };

    function shouldLog(messageLevel: LogLevel): boolean {
        return enabled && levels[messageLevel] >= levels[currentLevel];
    }

    function formatMessage(message: string): string {
        return `${prefix} ${message}`;
    }

    function formatArgs(args: any[]): any[] {
        return args.map(arg => {
            if (arg instanceof Error) {
                return {
                    name: arg.name,
                    message: arg.message,
                    stack: arg.stack
                };
            }
            if (typeof arg === 'object') {
                try {
                    return JSON.stringify(arg, null, 2);
                } catch {
                    return arg;
                }
            }
            return arg;
        });
    }

    return {
        debug(message: string, ...args: any[]) {
            if (shouldLog('debug')) {
                console.debug(formatMessage(message), ...formatArgs(args));
            }
        },

        info(message: string, ...args: any[]) {
            if (shouldLog('info')) {
                console.info(formatMessage(message), ...formatArgs(args));
            }
        },

        warn(message: string, ...args: any[]) {
            if (shouldLog('warn')) {
                console.warn(formatMessage(message), ...formatArgs(args));
            }
        },

        error(message: string, ...args: any[]) {
            if (shouldLog('error')) {
                console.error(formatMessage(message), ...formatArgs(args));
            }
        },

        setLevel(level: LogLevel) {
            currentLevel = level;
        }
    };
} 