import React from "react";
import { cn } from "../utils";

const Card = ({ children, className }) => {
  return (
    <div
      className={cn(
        "px-3 py-2 space-y-1 rounded-xl border border-blue-800",
        className
      )}
    >
      {children}
    </div>
  );
};

export { Card };
