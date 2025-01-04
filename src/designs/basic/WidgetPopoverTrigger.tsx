import * as PopoverPrimitive from '@radix-ui/react-popover';
import { useConfigData } from '@react/index';
import { Wobble } from '@ui/wobble';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageSquareDot, XIcon } from 'lucide-react';
import React from 'react';
import { cn } from 'src/utils';
import { cssVars } from '../constants';
import { OpenLogoSvg } from 'src/@components/OpenLogoSvg';

function WidgetPopoverTrigger({ isOpen }: { isOpen: boolean }) {
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
      className={cn('size-12 font-inter flex items-center justify-center')}
    >
      <Wobble>
        <div
          className={cn(
            'relative size-full rounded-full',
            'flex items-center justify-center',
            'transition-all',
            // 'bg-gradient-to-t from-primary/50 via-primary to-primary',
            "[background:radial-gradient(68.75%_68.75%_at_50%_100%,_#717171_0%,_#000000_100%)]",
            'text-primary-foreground',
            'shadow-xl',
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
                <OpenLogoSvg />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Wobble>
    </PopoverPrimitive.PopoverTrigger>
  );
}

export { WidgetPopoverTrigger };
