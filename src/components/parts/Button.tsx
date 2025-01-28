import { cn } from "@/lib/utils";

export const Button = ({
  text,
  className,
  disabled,
}: {
  text: string;
  className?: string;
  disabled?: boolean;
}) => (
  <button
    className={cn(
      "rounded-full px-4 py-2 transition hover:brightness-105 disabled:brightness-95",
      className,
    )}
    disabled={disabled}
  >
    {text}
  </button>
);
