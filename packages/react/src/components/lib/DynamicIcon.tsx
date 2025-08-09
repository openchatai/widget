import { isExhaustive, type IconNameU } from '@opencx/widget-core';
import {
  CheckCheckIcon,
  CheckIcon,
  CircleCheckBigIcon,
  CircleCheckIcon,
  CircleDashedIcon,
  CircleXIcon,
  ExpandIcon,
  Maximize2Icon,
  MaximizeIcon,
  Minimize2Icon,
  MinimizeIcon,
  ShrinkIcon,
  SquareCheckBigIcon,
  SquareCheckIcon,
  SquareXIcon,
  XIcon,
  type LucideIcon,
} from 'lucide-react';
import React from 'react';
import { cn } from './utils/cn';

const FallbackIcon = CircleDashedIcon;

export function DynamicIcon({
  name,
  className,
}: {
  name: IconNameU | undefined;
  className?: string;
}) {
  const Icon: LucideIcon = (() => {
    switch (name) {
      case 'Check':
        return CheckIcon;
      case 'CheckCheck':
        return CheckCheckIcon;
      case 'CircleCheck':
        return CircleCheckIcon;
      case 'CircleCheckBig':
        return CircleCheckBigIcon;
      case 'CircleX':
        return CircleXIcon;
      case 'Expand':
        return ExpandIcon;
      case 'Maximize':
        return MaximizeIcon;
      case 'Maximize2':
        return Maximize2Icon;
      case 'Minimize':
        return MinimizeIcon;
      case 'Minimize2':
        return Minimize2Icon;
      case 'Shrink':
        return ShrinkIcon;
      case 'SquareCheck':
        return SquareCheckIcon;
      case 'SquareCheckBig':
        return SquareCheckBigIcon;
      case 'SquareX':
        return SquareXIcon;
      case 'X':
        return XIcon;

      case undefined:
        return FallbackIcon;

      default:
        isExhaustive(name, DynamicIcon.name);
        return FallbackIcon;
    }
  })();

  return <Icon className={cn('size-4', className)} />;
}
