import { cn } from "@/libs/utils";
import { FC } from "react";
import { LiaAngleRightSolid } from "react-icons/lia";
import Icon from "../ui/LucidIcon";
import Link from "next/link";

type TDropDownCategoryItemProps = {
  type?: "mega" | "simple";
  collectionName: string;
  iconName: string;
  id: string;
};
const DropdownCategoryItem: FC<TDropDownCategoryItemProps> = ({
  type = "mega",
  collectionName,
  iconName,
  id,
}) => {
  return (
    <div className="flex items-center group justify-between ">
      <div className="flex items-center   text-gray-500 gap-3">
        <Icon className="w-[23px] h-[23px] " name={iconName as any} />
        <Link href={`/collection/${id}`}>
          <button className="relative flex items-center  text-[17px]">
            <div className="h-[3px] w-0 group-hover:w-[40px] transition-width duration-300 ease-linear bg-primary/50 absolute bottom-[1px]" />

            <span className="  group-hover:tracking-wide duration-300">
              {collectionName}
            </span>
          </button>
        </Link>
      </div>
      <LiaAngleRightSolid
        className={cn(type === "mega" ? " text-lg" : "hidden")}
      />
    </div>
  );
};

export default DropdownCategoryItem;
