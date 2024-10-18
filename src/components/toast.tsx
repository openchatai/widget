"use client"

import { cn } from "@lib/utils/cn"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { type VariantProps, cva } from "class-variance-authority"
import * as React from "react"
import styled from "styled-components"

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

const toastVariants = cva(
    "group pointer-events-auto relative flex w-full items-center justify-between overflow-hidden rounded-xl border-sm p-4 transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
    {
        variants: {
            variant: {
                default: "border bg-white",
                danger: "border border-rose-200 bg-rose-50 text-rose-500",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

const Toast = React.forwardRef<
    React.ElementRef<typeof ToastPrimitives.Root>,
    React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
    return (
        <ToastPrimitives.Root
            ref={ref}
            className={cn(toastVariants({ variant }), className)}
            {...props}
        />
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
        :hover {
        }
`

const ToastTitle = styled(ToastPrimitives.Title)`
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
`
type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

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
