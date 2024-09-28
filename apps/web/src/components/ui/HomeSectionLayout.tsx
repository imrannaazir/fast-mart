import { cn } from "@/libs/utils";
import { ClassValue } from "clsx";
import { FC, ReactNode } from "react";

type THomeSectionLayout = {
  leftSideContent: ReactNode;
  rightSideContent: ReactNode;
  className?: ClassValue;
  leftSideClassName?: ClassValue;
  rightSideClassName?: ClassValue;
};
const HomeSectionLayout: FC<THomeSectionLayout> = ({
  leftSideContent,
  rightSideContent,
  leftSideClassName,
  rightSideClassName,
  className,
}) => {
  return (
    <section className={cn("grid grid-cols-1 gap-4 xl:grid-cols-4", className)}>
      {/* left */}
      <div className={cn("hidden xl:block", leftSideClassName)}>{leftSideContent}</div>

      {/* right */}

      <div className={cn("xl:col-span-3", rightSideClassName)}>{rightSideContent}</div>
    </section>
  );
};

export default HomeSectionLayout;
