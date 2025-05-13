import { cn } from "../utils";

const Label = ({ children, title, className }) => {
  return (
    <p className={cn("flex-1 text-base font-bold text-nowrap", className)}>
      <span className="font-sans font-normal">{title}: </span>
      {children}
    </p>
  );
};

export { Label };
