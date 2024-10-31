import { cn } from "@/libs/utils";
import { ClassValue } from "clsx";
import { ReactNode } from "react";

const AuthCheck = ({ children, className }: { children: ReactNode; className?: ClassValue }) => {
  return <div className={cn(className)}>{children}</div>;
};

export default AuthCheck;
