"use client"

import { useToast } from "src/hooks/use-toast"
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
                        <div
                            style={{
                                display: "grid",
                                gap: "0.5rem",
                            }}>
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
