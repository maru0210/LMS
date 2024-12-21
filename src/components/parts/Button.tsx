import {cn} from "@/lib/utils";

export const Button = (
  {text, className, disabled}: { text: string, className?: string, disabled?: boolean }
) => (
  <button className={cn("px-4 py-2 rounded-full hover:brightness-105 disabled:brightness-95 transition", className)}
          disabled={disabled}>
    {text}
  </button>
)
