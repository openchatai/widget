"use client"

import { useToast } from "@lib/hooks/use-toast"
import {
    Toast,
    ToastProvider,
    ToastTitle,
    ToastViewport,
} from "./toast"

export function Toaster() {
    const { toasts } = useToast()

    return (
        <ToastProvider>
            {toasts.map(function ({ id, title, action, ...props }) {
                return (
                    <Toast key={id} {...props}>
                        <div className="grid gap-2">
                            {title && <ToastTitle>{title}</ToastTitle>}
                        </div>
                        {action}
                    </Toast>
                )
            })}
            <ToastViewport />
        </ToastProvider>
    )
}
