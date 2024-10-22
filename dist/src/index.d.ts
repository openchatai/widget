import { WidgetOptions } from '../lib/types';
declare global {
    interface Window {
        initOpenScript: typeof initOpenScript;
    }
}
export declare function initOpenScript(options: WidgetOptions, mode?: "default" | "iframed"): void;
