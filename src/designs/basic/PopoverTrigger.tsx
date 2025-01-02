import React from 'react';
import { useConfigData } from '@react/index';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cssVars } from '../constants';
import { cn } from 'src/utils';
import {
  MessageCircleQuestionIcon,
  MessageSquareDot,
  XIcon
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Wobble } from '@ui/wobble';

function PopoverTrigger({ isOpen }: { isOpen: boolean }) {
  const { theme } = useConfigData();

  return (
    <PopoverPrimitive.PopoverTrigger
      data-chat-widget
      style={{
        fontSize: '16px',
        position: 'fixed',
        zIndex: 10000000,
        ...cssVars(
          { primary: theme.primaryColor },
          { triggerOffset: theme.triggerOffset }
        ),
        right: theme.triggerOffset,
        bottom: theme.triggerOffset
      }}
      className={cn('size-14 font-inter flex items-center justify-center')}
    >
      <Wobble>
        <div
          className={cn(
            'relative size-full rounded-full',
            'flex items-center justify-center',
            'transition-all',
            'bg-gradient-to-tr bg-primary text-white',
            'shadow-lg',
            'ring-4 ring-black/10',
            'active:scale-90',
            '[&_svg]:size-6'
          )}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="x-icon"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0, transition: { duration: 0.1 } }}
              >
                <XIcon />
              </motion.div>
            ) : (
              <motion.div
                key="message-icon"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0, transition: { duration: 0.1 } }}
              >
                <MessageSquareDot />
              </motion.div>
            )}
          </AnimatePresence>

          <span className="absolute top-0 right-0 size-3 bg-emerald-600 border-2 border-white rounded-full" />
        </div>
      </Wobble>
    </PopoverPrimitive.PopoverTrigger>
  );
}

export { PopoverTrigger };
