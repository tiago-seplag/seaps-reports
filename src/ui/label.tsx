import type { ReactNode } from "react";
import { cn } from "../lib/cn";

/** `TÍTULO: valor` em uma linha. */
export function Label({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("flex-1 text-base font-bold text-nowrap", className)}>
      <span className="font-sans font-normal">{title}: </span>
      {children}
    </p>
  );
}
