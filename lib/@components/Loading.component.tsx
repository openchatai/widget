import { Avatar, AvatarFallback } from "@ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
export function BotLoadingComponent() {
  return (
    <AnimatePresence>
      <motion.div
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-start w-full gap-1">
        <div className="flex items-center gap-1">
          <Avatar className="animate-pulse size-7 rounded-full bg-gray-200">
            <AvatarFallback />
          </Avatar>
        </div>
        <div className="w-1/2 min-w-[80%]">
          <div className="bg-gray-200 p-7 rounded-lg animate-pulse" />
        </div>
      </motion.div>
    </AnimatePresence>

  );
}
