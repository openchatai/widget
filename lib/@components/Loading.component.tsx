import { Avatar, AvatarFallback } from "@ui/avatar";
import { motion, AnimatePresence } from "framer-motion";

export function BotLoadingComponent() {
  return (
    <AnimatePresence>
      <motion.div
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-row items-end w-full gap-1">
        <div className="flex items-center gap-1">
          <Avatar className="animate-pulse size-7 rounded-xl bg-secondary">
            <AvatarFallback />
          </Avatar>
        </div>
        <div className="flex items-center [&_span]:bg-secondary-foreground [&_span]:size-1 gap-1 p-3 rounded-lg rounded-bl-none bg-secondary">
          <span className="rounded-full animate-bounce [animation-delay:-0.3s]" />
          <span className="rounded-full animate-bounce [animation-delay:-0.15s]" />
          <span className="rounded-full animate-bounce" />
        </div>
      </motion.div>
    </AnimatePresence>

  );
}
