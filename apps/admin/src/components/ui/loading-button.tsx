import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";

const LoadingButton = ({ children = "Please wait", className }: { children?: ReactNode; className?: ClassValue }) => {
  return (
    <Button className={cn("flex items-center justify-center gap-2", className)} disabled>
      {children}
      <Loader2 className="h-4 w-4 animate-spin" />
    </Button>
  );
};

export default LoadingButton;
