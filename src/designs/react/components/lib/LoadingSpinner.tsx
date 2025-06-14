import React from 'react';
import { LoaderIcon } from 'lucide-react';
import { cn } from './utils/cn';

export function LoadingSpinner({ className }: { className?: string }) {
  return <LoaderIcon className={cn('size-4 animate-spin', className)} />;
}
