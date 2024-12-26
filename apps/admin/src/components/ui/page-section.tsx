import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { FC, ReactNode } from "react";
import { Label } from "./label";

type TPageSectionProps = {
  children: ReactNode;
  className?: ClassValue;
  title?: string;
};
const PageSection: FC<TPageSectionProps> = ({ children, className, title }) => {
  return (
    <section className={cn("bg-background border-foreground/20 rounded-xl border p-6 shadow-md", className)}>
      {title && <Label>{title}</Label>}
      {children}
    </section>
  );
};

export default PageSection;
