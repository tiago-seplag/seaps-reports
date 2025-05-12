import { cn } from "../utils";

const Label = ({ children, title, className }) => {
  return (
    <p className={cn("text-base font-bold flex-1 text-nowrap", className)}>
      <span className="font-normal font-sans">{title}: </span>
      {children}
    </p>
  );
};

export { Label };
