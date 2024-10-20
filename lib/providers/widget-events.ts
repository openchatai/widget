import { type Emitter } from "mitt";

export type WidgetEvents = {
    init: {
        type: 'init';
    }
};


export type WidgetEventsEmitter = Emitter<WidgetEvents>