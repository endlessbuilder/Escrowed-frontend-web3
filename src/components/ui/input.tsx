import * as React from "react";

import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
      >
        <input
          type={type}
          ref={ref}
          {...props}
          className="focus-visible: ring-0 outline-none w-full bg-transparent"
        />
        <XIcon className="w-5 h-5 text-[#5D5D5D]" />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
