import assets from "@/assets";
import { cn } from "@/libs/utils";
import { ClassValue } from "clsx";
import Image from "next/image";
import { FC } from "react";
type THomeSectionTop = {
  heading: string;
  description: string;
  className?: ClassValue;
};

const HomeSectionTop: FC<THomeSectionTop> = ({
  heading,
  description,
  className,
}) => {
  return (
    <div className={cn(className)}>
      {/* heading */}
      <h2 className="text-[26px] font-bold">{heading}</h2>
      {/* divider */}
      <div className="flex items-center gap-2">
        <span className="h-[1.5px] w-[50px] bg-primary/50" />
        <Image src={assets.svg.leaf} alt="leaf" />
        <span className="h-[1.5px] w-[50px] bg-primary/50" />
        <span />
      </div>
      {/* description */}
      <p className="text-sm text-gray-500 ">{description}</p>
    </div>
  );
};

export default HomeSectionTop;
