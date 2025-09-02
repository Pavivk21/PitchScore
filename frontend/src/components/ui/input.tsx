"use client";

import * as React from "react";
import { cn } from "./utils";

function Input({ className, type = "text", ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "w-full min-w-0 h-9 px-3 py-1 rounded-md border border-input bg-input-background text-base text-foreground placeholder:text-muted-foreground " +
        "selection:bg-primary selection:text-primary-foreground dark:bg-input/30 " +
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium " +
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 " +
        "md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] " +
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  );
}

export { Input };
