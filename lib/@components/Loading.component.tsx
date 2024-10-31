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
          <Avatar className="animate-pulse size-7 rounded-xl bg-gray-200">
            <AvatarFallback />
          </Avatar>
        </div>
        <div className="w-1/2 min-w-[80%]">
          <div className="bg-gray-200 p-4 rounded-lg animate-pulse space-y-2">
            <span
              className="block w-5/6 h-4 bg-gray-300 rounded-md" />
            <span
              className="block w-4/6 h-4 bg-gray-300 rounded-md" />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>

  );
}
