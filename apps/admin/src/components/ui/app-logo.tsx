import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { Link } from "react-router-dom";

const AppLogo = ({ className }: { className?: ClassValue }) => {
  return (
    <Link className={cn("text-3xl font-bold", className)} to={"/"}>
      <span className="text-teal-500">Fast</span>
      <span className="text-foreground/85">mart</span>
      <span className="text-teal-500">.</span>
    </Link>
  );
};

export default AppLogo;
