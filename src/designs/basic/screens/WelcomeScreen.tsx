import React, { useState } from "react";
import { useChat, useConfigData, useContact, useLocale, usePreludeData } from "@lib/index";
import { Input } from "@ui/input";
import { Button } from "@ui/button";
import { SendHorizontal } from "lucide-react";
import { z } from "zod";
import { motion } from "framer-motion";
import { useAsyncFn } from "react-use";

const schema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
});

export function WelcomeScreen() {
    const locale = useLocale();
    const { data: preludeData } = usePreludeData()
    const { createContactAsync } = useContact();
    const { sendMessage } = useChat();
    const { assets } = useConfigData()
    const [handleSubmitState, handleSubmit] = useAsyncFn(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());
        const result = schema.safeParse(data);

        if (result.success) {
            await createContactAsync(result.data);
            await sendMessage({
                content: { text: locale.get("hello-greeting") },
                user: result.data
            });
        }
    })

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-full flex flex-col bg-background relative overflow-hidden rounded-xl"
        >
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    height: '240px'
                }}
            />

            <div className="flex-1 px-4 pt-12 flex flex-col justify-start text-left space-y-4 relative z-10">
                <div className="flex items-center justify-between w-full mb-2">
                    {
                        assets?.organizationLogo ? <img
                            src={assets?.organizationLogo}
                            alt="Company Logo"
                            className="h-8 w-auto object-contain"
                        /> : <h2 className="font-bold text-xl text-white">
                            {preludeData?.organization_name}
                        </h2>
                    }
                </div>
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-white">
                        {locale.get("welcome-title")}
                    </h1>

                    <p className="text-white/90 text-sm max-w-[320px] leading-relaxed">
                        {locale.get("welcome-description")}
                    </p>
                </div>
            </div>

            <div className="p-4 bg-background shadow-xl relative z-10 rounded-t-3xl -mt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Input
                            required
                            placeholder={locale.get("your-name")}
                            name="name"
                        />
                        <Input
                            required
                            type="email"
                            placeholder={locale.get("your-email")}
                            name="email"
                        />
                    </div>

                    <Button
                        disabled={handleSubmitState.loading}
                        className="w-full bg-black hover:bg-black/90 text-white shadow-lg border-0"
                        size="lg"
                    >
                        {handleSubmitState.loading ? locale.get("starting-chat") : locale.get("start-chat")}
                        <SendHorizontal className="size-4" />
                    </Button>
                </form>

                <div className="mt-4 text-center">
                    <span className="text-xs text-muted-foreground">
                        Powered by{" "}
                        <a
                            href="https://opencopilot.so"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold italic text-primary hover:underline"
                        >
                            Open
                        </a>
                    </span>
                </div>
            </div>
        </motion.div>
    );
}