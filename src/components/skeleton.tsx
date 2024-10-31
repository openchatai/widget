import React from "react"
import { cn } from "src/utils"

function Skeleton({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("animate-pulse rounded-md bg-secondary", className)}
            {...props}
        />
    )
}

export { Skeleton }
