import { isAuthenticated } from "@/libs/auth";
import { cn } from "@/libs/utils";
import { ClassValue } from "clsx";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const AuthCheck = ({ children, className }: { children: ReactNode; className?: ClassValue }) => {
  const auth = isAuthenticated();
  if (!auth) redirect("/login");
  return <div className={cn(className)}>{children}</div>;
};

export default AuthCheck;
