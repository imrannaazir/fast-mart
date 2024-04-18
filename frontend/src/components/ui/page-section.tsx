import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { FC, ReactNode } from "react";

type TPageSectionProps = {
  children: ReactNode;
  className?: ClassValue;
};
const PageSection: FC<TPageSectionProps> = ({ children, className }) => {
  return (
    <section
      className={cn("bg-background p-6 rounded-lg border shadow-sm", className)}
    >
      {children}
    </section>
  );
};

export default PageSection;
