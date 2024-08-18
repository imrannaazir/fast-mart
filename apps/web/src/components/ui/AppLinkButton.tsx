import { cn } from "@/libs/utils";
import { ClassValue } from "clsx";
import { FC, ReactNode } from "react";

type TAppLinkButton = {
  children: ReactNode;
  className?: ClassValue;
};
const AppLinkButton: FC<TAppLinkButton> = ({ children, className }) => {
  return (
    <button className={cn("relative ", className)}>
      {children}
      <div className="h-[3px] w-0 group-hover:w-[40px] transition-width duration-300 ease-linear bg-primary/50 absolute bottom-[1px]" />
    </button>
  );
};

export default AppLinkButton;
