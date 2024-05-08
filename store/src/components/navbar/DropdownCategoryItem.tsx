import { LiaAngleRightSolid } from "react-icons/lia";
import { LuCarrot } from "react-icons/lu";

const DropdownCategoryItem = () => {
  return (
    <div className="flex items-center group justify-between ">
      <div className="flex items-center   text-gray-500 gap-3">
        <LuCarrot className="w-[23px] h-[23px] " />
        <button className="relative flex items-center  text-[17px]">
          <div className="h-[3px] w-0 group-hover:w-[40px] transition-width duration-300 ease-linear bg-primary/50 absolute bottom-[1px]" />

          <span className="  group-hover:tracking-wide duration-300">
            Vegetables & Fresh Fruit
          </span>
        </button>
      </div>
      <LiaAngleRightSolid className=" text-lg" />
    </div>
  );
};

export default DropdownCategoryItem;
