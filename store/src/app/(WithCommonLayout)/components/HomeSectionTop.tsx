import assets from "@/assets";
import Image from "next/image";
import { FC } from "react";
type THomeSectionTop = {
  heading: string;
  description: string;
};

const HomeSectionTop: FC<THomeSectionTop> = ({ heading, description }) => {
  return (
    <div>
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
      <p className="text-sm text-gray-500 font-semibold">{description}</p>
    </div>
  );
};

export default HomeSectionTop;
