import { cn } from "@/libs/utils";
import { ClassValue } from "clsx";
import { FC, ReactNode } from "react";

type TAppLinkButton = {
  children: ReactNode;
  className?: ClassValue;
};
const AppLinkButton: FC<TAppLinkButton> = ({ children, className }) => {
  return (
    <button className={cn("relative", className)}>
      {children}
      <div className="transition-width bg-primary/50 absolute bottom-[1px] h-[3px] w-0 duration-300 ease-linear group-hover:w-[40px]" />
    </button>
  );
};

export default AppLinkButton;
