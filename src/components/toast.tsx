import { cn } from "@lib/utils/cn"
import * as ToastPrimitives from "@radix-ui/react-toast"
import * as React from "react"
import styled, { css } from "styled-components"

const ToastProvider = ToastPrimitives.Provider
const ToastViewport = styled(ToastPrimitives.Viewport)`
  display: flex;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 50%;
  padding: 1.5rem;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  max-width: 100%;
  max-height: 100%;
`

const toastVariants = {
    default: css`
    border: 1px solid #e5e7eb;
    background-color: #ffffff;
  `,
    danger: css`
    border: 1px solid #fca5a5;
    background-color: #fef2f2;
    color: #dc2626;
  `,
}

type ToastVariant = keyof typeof toastVariants

const ToastBase = styled(ToastPrimitives.Root)<{
    variant: ToastVariant
}>`
  pointer-events: auto;
  position: relative;
  width: 100%;
  display: flex;
  justify-items: justify-between;
  overflow: hidden;
  border-radius: 0.75rem;
  padding: 1rem;
  transition-property: transform, opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;

  &[data-swipe="cancel"] {
    transform: translateX(0);
  }

  &[data-swipe="end"] {
    transform: translateX(var(--radix-toast-swipe-end-x));
  }

  &[data-swipe="move"] {
    transform: translateX(var(--radix-toast-swipe-move-x));
    transition-property: none;
  }

  &[data-state="open"] {
    animation: toast-slide-in-from-top 150ms cubic-bezier(0.16, 1, 0.3, 1),
      toast-fade-in 150ms linear;
  }

  &[data-state="closed"] {
    animation: toast-fade-out-80 100ms linear,
      toast-slide-out-to-right-full 100ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  ${(props) => props.variant && toastVariants[props.variant]}
`

const Toast = React.forwardRef<
    React.ElementRef<typeof ToastPrimitives.Root>,
    React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & { variant: ToastVariant }
>(({ className, variant, ...props }, ref) => {
    return (
        <ToastBase ref={ref} className={cn(className)} variant={variant} {...props} />
    )
})

Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = styled(ToastPrimitives.Action)`
  display: inline-flex;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  border-width: 1px;
  height: 2rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  background-color: transparent;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;

  &:hover {
    background-color: #f3f4f6;
  }
`

const ToastTitle = styled(ToastPrimitives.Title)`
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
`

type ToastProps = React.ComponentPropsWithoutRef<typeof ToastBase>
type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
    type ToastProps,
    type ToastActionElement,
    ToastProvider,
    ToastViewport,
    Toast,
    ToastTitle,
    ToastAction,
}