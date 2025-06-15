import * as React from 'react';
import { cn } from './lib/utils/cn';
import { OpenLogoSvg } from './svg/OpenLogoSvg';
import { useConfig } from '../../../headless/react';
import { Wobble } from './lib/wobble';

export function PoweredByOpen({ className }: { className?: string }) {
  const { token } = useConfig();

  return (
    <div
      className={cn(
        'flex items-center justify-center gap-2 p-2 pt-0 bg-background',
        className,
      )}
    >
      <Wobble>
        <a
          href={`https://open.cx/?ref=${token}`}
          target="_blank"
          rel="noreferrer"
          className={cn(
            'text-[10px] flex items-center',
            'text-muted-foreground/70 [&_svg]:text-muted-foreground/70',
            'hover:text-primary [&_svg]:hover:text-primary',
          )}
        >
          <span>Powered by</span>
          <span>&nbsp;</span>
          <span className="flex items-center gap-[1px]">
            <span>
              <OpenLogoSvg className="size-3 inline-block" />
            </span>
            <span className="font-semibold">open</span>
          </span>
        </a>
      </Wobble>
    </div>
  );
}
