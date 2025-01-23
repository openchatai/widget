import React from "react";
import { Avatar, AvatarFallback } from "./lib/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { MotionDiv } from "./lib/MotionDiv";

export function BotLoadingComponent() {
  return (
    <AnimatePresence>
      <MotionDiv
        data-test="loading-container"
        className="flex flex-row items-end w-full gap-1 animate-pulse"
      >
        <div className="flex items-center gap-1" data-test="avatar-container">
          <Avatar data-test="loading-avatar">
            <AvatarFallback data-test="avatar-fallback" />
          </Avatar>
        </div>
        <div
          className="flex items-center [&_span]:bg-secondary-foreground [&_span]:size-1 gap-1 p-2 rounded-xl bg-secondary border"
          data-test="loading-dots-container"
        >
          <motion.span
            data-test="loading-dot-1"
            className="rounded-full animate-bounce [animation-delay:-0.3s]"
          />
          <motion.span
            data-test="loading-dot-2"
            className="rounded-full animate-bounce [animation-delay:-0.15s]"
          />
          <motion.span
            data-test="loading-dot-3"
            className="rounded-full animate-bounce"
          />
        </div>
      </MotionDiv>
    </AnimatePresence>
  );
}
