import React from "react";
import { Avatar, AvatarFallback } from "@ui/avatar";
import { motion, AnimatePresence } from "framer-motion";

export function BotLoadingComponent() {
  return (
    <AnimatePresence>
      <motion.div
        data-test="loading-container"
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-row items-end w-full gap-1"
      >
        <div className="flex items-center gap-1" data-test="avatar-container">
          <Avatar className="animate-pulse" data-test="loading-avatar">
            <AvatarFallback data-test="avatar-fallback" />
          </Avatar>
        </div>
        <div className="flex items-center [&_span]:bg-secondary-foreground [&_span]:size-1 gap-1 p-3 rounded-lg rounded-bl-none bg-secondary" data-test="loading-dots-container">
          <motion.span data-test="loading-dot-1" className="rounded-full animate-bounce [animation-delay:-0.3s]" />
          <motion.span data-test="loading-dot-2" className="rounded-full animate-bounce [animation-delay:-0.15s]" />
          <motion.span data-test="loading-dot-3" className="rounded-full animate-bounce" />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
