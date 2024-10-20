type LoggerFunction = (...args: unknown[]) => void;

// simple logger

interface WidgetLogger {
    readonly name?: string;

    debug: LoggerFunction;
    info: LoggerFunction;
    warn: LoggerFunction;
    error: LoggerFunction;
}
class ConsoleLogger implements WidgetLogger {
    name?: string = "ConsoleLogger";
    debug: LoggerFunction = (...args: unknown[]) => {
        console.debug(...args);
    };

    info: LoggerFunction = (...args: unknown[]) => {
        console.info(...args);
    };

    warn: LoggerFunction = (...args: unknown[]) => {
        console.warn(...args);
    };

    error: LoggerFunction = (...args: unknown[]) => {
        console.error(...args);
    };
}


export {
    type WidgetLogger,
    ConsoleLogger
}