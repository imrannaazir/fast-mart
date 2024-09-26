import { cn } from "@/libs/utils";
import { ClassValue } from "clsx";
import { FC, ReactNode } from "react";

type TContainer = {
  children: ReactNode;
  className?: ClassValue;
};

const Container: FC<TContainer> = ({ children, className }) => {
  return <div className={cn("mx-auto max-w-7xl px-4", className)}>{children}</div>;
};

export default Container;
