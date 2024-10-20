import { WidgetOptions } from "@lib/types";
import React, { forwardRef, useImperativeHandle } from "react";
import { ChatProvider } from "./ChatProvider";
import { ConfigDataProvider } from "./ConfigProvider";
import { ConsumerProvider } from "./ConsumerProvider";
import { LocaleProvider } from "./LocalesProvider";
import type { WidgetEvents, WidgetEventsEmitter } from "./widget-events";
import mitt from 'mitt';
import { useLazyRef } from "@lib/hooks/useLazyRef";

type RootProps = React.PropsWithChildren<{
    options: WidgetOptions;
}>

type RootRef = {
    ev: WidgetEventsEmitter
}

const Root = forwardRef<RootRef, RootProps>(({ options, children }, _ref) => {
    const ev = useLazyRef(() => mitt<WidgetEvents>());
    
    useImperativeHandle(_ref, () => ({
        ev: ev.current
    }));

    return (
        <ConfigDataProvider data={options} emitter={ev.current}>
            <LocaleProvider>
                <ConsumerProvider>
                    <ChatProvider>{children}</ChatProvider>
                </ConsumerProvider>
            </LocaleProvider>
        </ConfigDataProvider>
    );
});

Root.displayName = "Root";

export default Root;