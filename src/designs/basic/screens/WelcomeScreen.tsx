import React, { useState } from "react";
import { useChat, useConfigData, useContact, useLocale } from "@lib/index";
import { Input } from "@ui/input";
import { Button } from "@ui/button";
import { SendHorizontal } from "lucide-react";
import { z } from "zod";
import { motion } from "framer-motion";

const schema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
});

const INTERCOM_LOGO = "https://downloads.intercomcdn.com/i/o/509470/ec31507001774ead046f5d33/27a34b11d26329835b4f4e60adb46ec7.png";
const SUPPORT_AVATAR = "https://static.intercomassets.com/avatars/5800742/square_128/meprof-removebg__2_-removebg-preview-1730042688.png";

export function WelcomeScreen() {
    const { theme } = useConfigData();
    const locale = useLocale();
    const { createContactAsync } = useContact();
    const [loading, setLoading] = useState(false);
    const { sendMessage } = useChat();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        
        try {
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
        } finally {
            setLoading(false);
        }
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-full flex flex-col bg-background relative overflow-hidden rounded-xl border border-border/40"
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
            
            <div className="flex-1 px-6 pt-12 flex flex-col justify-start text-left space-y-4 relative z-10">
                <div className="flex items-center justify-between w-full mb-2">
                    <img 
                        src={INTERCOM_LOGO} 
                        alt="Company Logo" 
                        className="h-8 w-auto object-contain"
                    />
                    <div className="flex -space-x-2">
                        <img 
                            src={SUPPORT_AVATAR} 
                            alt="Support Team" 
                            className="h-8 w-8 rounded-full border-2 border-white shadow-sm"
                        />
                        <div className="h-8 w-8 rounded-full border-2 border-white shadow-sm bg-primary/10 flex items-center justify-center">
                            <span className="text-xs font-medium text-primary">+2</span>
                        </div>
                    </div>
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

            <div className="p-6 bg-background shadow-xl relative z-10 rounded-t-3xl -mt-6">
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
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-primary to-primary/80 hover:brightness-105 text-background shadow-lg shadow-primary/20 border-0"
                        size="lg"
                    >
                        {loading ? locale.get("starting-chat") : locale.get("start-chat")}
                        <SendHorizontal className="size-4 ml-2" />
                    </Button>
                </form>
            </div>
        </motion.div>
    );
}