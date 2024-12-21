import React from "react";
import { ConfigDataProvider } from "./providers/ConfigDataProvider";
import { WidgetOptions } from "./types";
import { LocaleProvider } from "./providers/LocalesProvider";
import { ChatProvider } from "./providers/ChatProvider";
import { ContactProvider } from "./providers/ContactProvider";
import { ClientProvider } from "./providers/ClientProvider";

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
                    <ClientProvider>
                        <ChatProvider>{children}</ChatProvider>
                    </ClientProvider>
                </LocaleProvider>
            </ContactProvider>
        </ConfigDataProvider>
    );
}
