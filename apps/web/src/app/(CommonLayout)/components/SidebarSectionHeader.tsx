import { cn } from "@/libs/utils";
import { ClassValue } from "clsx";

const SidebarSectionHeader = ({
  level,
  className,
  border = true,
}: {
  level: string;
  className?: ClassValue;
  border?: boolean;
}) => {
  return (
    <h3 className={cn("flex flex-col text-xl font-semibold", className)}>
      <span>{level}</span>
      {border && <span className="bg-primary h-[2px] w-[65px]" />}
    </h3>
  );
};

export default SidebarSectionHeader;
