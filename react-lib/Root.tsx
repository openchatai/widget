import React from "react";
import { ConfigDataProvider } from "./providers/ConfigDataProvider";
import { WidgetOptions } from "./types";
import { LocaleProvider } from "./providers/LocalesProvider";
import { ChatProvider } from "./providers/ChatProvider";
import { ContactProvider } from "./providers/ContactProvider";

export function WidgetRoot({
    children,
    options,
}: {
    children: React.ReactNode;
    options: WidgetOptions;
}) {
    return (
        <ConfigDataProvider data={options}>
            <ContactProvider>
                <LocaleProvider>
                    <ChatProvider>{children}</ChatProvider>
                </LocaleProvider>
            </ContactProvider>
        </ConfigDataProvider>
    );
}
