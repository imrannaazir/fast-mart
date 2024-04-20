import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";

const LoadingButton = ({
  children = "Please wait",
}: {
  children?: ReactNode;
}) => {
  return (
    <Button className="flex items-center gap-2" disabled>
      {children}
      <Loader2 className="  h-4 w-4 animate-spin" />
    </Button>
  );
};

export default LoadingButton;
