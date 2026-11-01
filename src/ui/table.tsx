import type { ComponentProps } from "react";
import { cn } from "../lib/cn";

export function TableHead({ className, ...props }: ComponentProps<"th">) {
  return (
    <th
      className={cn(
        "text-muted-foreground h-10 text-left align-middle font-medium [&_svg]:inline-block",
        className,
      )}
      {...props}
    />
  );
}

export function TableCell({ className, ...props }: ComponentProps<"td">) {
  return <td className={cn("py-0.5", className)} {...props} />;
}
