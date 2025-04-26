import React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';

export function WidgetPopoverAnchor() {
  return (
    <PopoverPrimitive.Anchor
      style={{ position: 'fixed', right: 0, bottom: 0 }}
    />
  );
}
