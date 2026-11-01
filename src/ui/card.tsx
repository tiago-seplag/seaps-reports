import type { ReactNode } from "react";
import { cn } from "../lib/cn";

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border-primary space-y-1 rounded-xl border px-3 py-2",
        className,
      )}
    >
      {children}
    </div>
  );
}
