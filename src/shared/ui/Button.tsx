import React from "react";
import { cn } from "../lib/utils/cn";

export const Button = ({
    className,
    children,
    ...props
}: React.ComponentProps<"button">) => {
    return (
        <button
            {...props}
            type="button"
            className={cn(
                "text-red-700 underline disabled:opacity-50",
                "hover:text-red-800 hover:no-underline",
                "active:text-red-900",
                "focus:outline-hidden focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-red-50",
                "rounded-xs transition-colors",
                "cursor-pointer",
                className,
            )}>
            {children}
        </button>
    );
};
