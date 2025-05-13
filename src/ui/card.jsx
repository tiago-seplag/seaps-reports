import { cn } from "../utils";

const Card = ({ children, className }) => {
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
};

export { Card };
