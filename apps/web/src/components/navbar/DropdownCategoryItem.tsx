import { cn } from "@/libs/utils";
import { icons } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import { LiaAngleRightSolid } from "react-icons/lia";
import LucidIcon from "../ui/LucidIcon";

type TDropDownCategoryItemProps = {
  type?: "mega" | "simple";
  collectionName: string;
  iconName: string;
  id: string;
};
const DropdownCategoryItem: FC<TDropDownCategoryItemProps> = ({ type = "mega", collectionName, id, iconName }) => {
  return (
    <div className="group flex items-center justify-between">
      <div className="flex items-center gap-3 text-gray-500">
        <LucidIcon name={iconName as keyof typeof icons} />
        <Link href={`/search?collections=${id}`}>
          <button className="relative flex items-center text-[17px]">
            <div className="transition-width bg-primary/50 absolute bottom-[1px] h-[3px] w-0 duration-300 ease-linear group-hover:w-[40px]" />

            <span className="duration-300 group-hover:tracking-wide">{collectionName}</span>
          </button>
        </Link>
      </div>
      <LiaAngleRightSolid className={cn(type === "mega" ? "text-lg" : "hidden")} />
    </div>
  );
};

export default DropdownCategoryItem;
