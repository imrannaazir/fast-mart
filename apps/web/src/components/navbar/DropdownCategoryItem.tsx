import { cn } from "@/libs/utils";
import { FC } from "react";
import { LiaAngleRightSolid } from "react-icons/lia";
import Icon from "../ui/LucidIcon";
import Link from "next/link";
import { Apple } from "lucide-react";

type TDropDownCategoryItemProps = {
  type?: "mega" | "simple";
  collectionName: string;
  iconName: string;
  id: string;
};
const DropdownCategoryItem: FC<TDropDownCategoryItemProps> = ({ type = "mega", collectionName, iconName, id }) => {
  return (
    <div className="group flex items-center justify-between">
      <div className="flex items-center gap-3 text-gray-500">
        <Apple className="h-[23px] w-[23px]" />
        {/* <Icon className="w-[23px] h-[23px] " name={iconName as any} /> */}
        <Link href={`/collection/${id}`}>
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
