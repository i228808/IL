"use client"

import { ReactNode } from "react"
import { cn } from "@lib/util/cn"

export const InteractiveCard = ({ children, className }: { children: ReactNode, className?: string }) => {
    return (
        <div className={cn("relative", className)}>
            <div
                className={cn(
                    "relative h-full w-full rounded-xl transition-all duration-200 ease-linear",
                )}
            >
                <div className="relative group glass-card rounded-md overflow-hidden p-4 shadow-xl hover:shadow-2xl hover:shadow-brand-secondary/20 transition-shadow">
                    {children}

                    {/* Glossy reflection effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
            </div>
        </div>
    )
}
