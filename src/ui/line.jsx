import { cn } from "../utils";

const Line = ({ children, className }) => {
  return (
    <div
      className={cn("border-primary inline-flex w-full border-b", className)}
    >
      {children}
    </div>
  );
};

export { Line };
