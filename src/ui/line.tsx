import type { ReactNode } from "react";
import { cn } from "../lib/cn";

/** Linha de um `Card`, com os `Label` lado a lado. */
export function Line({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("border-primary inline-flex w-full border-b", className)}
    >
      {children}
    </div>
  );
}
