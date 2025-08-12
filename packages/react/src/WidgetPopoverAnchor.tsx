import React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { useDocumentDir } from '@opencx/widget-react-headless';

export function WidgetPopoverAnchor() {
  const { dir } = useDocumentDir();

  return (
    <PopoverPrimitive.Anchor
      style={{
        position: 'fixed',
        bottom: 0,
        right: dir === 'ltr' ? 0 : undefined,
        left: dir === 'rtl' ? 0 : undefined,
      }}
    />
  );
}
