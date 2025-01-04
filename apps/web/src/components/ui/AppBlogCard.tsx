import { cn } from "@/libs/utils";
import { ClassValue } from "clsx";
import Image from "next/image";
import { FC } from "react";
type TAppBlogCardProps = {
  className?: ClassValue;
};
const AppBlogCard: FC<TAppBlogCardProps> = ({ className }) => {
  return (
    <div className={cn("group", className)}>
      <div className="w-full overflow-hidden rounded-md border">
        <Image
          className="aspect-square rounded-md object-cover transition-all duration-300 group-hover:rotate-3 group-hover:scale-110"
          src={"https://themes.pixelstrap.com/fastkart/assets/images/vegetable/blog/1.jpg"}
          width={464}
          height={300}
          alt=""
        />
      </div>
      <div className="mt-4 text-start">
        {/* date */}
        <p className="text-sm font-medium text-gray-700">20 March, 2022</p>
        {/* title */}
        <h3 className="group-hover:text-primary text-lg font-semibold transition-colors duration-300">
          Fresh Vegetable Online
        </h3>
      </div>
    </div>
  );
};

export default AppBlogCard;
