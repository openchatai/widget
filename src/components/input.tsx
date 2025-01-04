import * as React from 'react';
import { cn } from 'src/utils';
import { Wobble } from './wobble';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <Wobble ref={ref}>
        <input
          type={type}
          className={cn(
            'flex w-full rounded-xl border border-input bg-background p-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-primary-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition',
            className
          )}
          {...props}
        />
      </Wobble>
    );
  }
);
Input.displayName = 'Input';

export { Input };
