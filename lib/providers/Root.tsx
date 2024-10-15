import { WidgetOptions } from "@lib/types";
import React from "react";
import { ChatProvider } from "./ChatProvider";
import { ConfigDataProvider } from "./ConfigProvider";
import { ConsumerProvider } from "./ConsumerProvider";
import { LocaleProvider } from "./LocalesProvider";

export default function Root({
    children,
    options,
}: {
    children: React.ReactNode;
    options: WidgetOptions;
}) {
    return (
        <ConfigDataProvider data={options}>
            <LocaleProvider>
                <ConsumerProvider>
                    <ChatProvider>{children}</ChatProvider>
                </ConsumerProvider>
            </LocaleProvider>
        </ConfigDataProvider>
    );
}
