import assets from "@/assets";
import Image from "next/image";
import Link from "next/link";
import { PiBread } from "react-icons/pi";

const HomePageCategoryCard = () => {
  return (
    <Link
      href={""}
      className={`flex gap-4  items-center justify-center flex-col bg-gray-100 w-[174px] h-[134px] rounded-md mb-10 text-gray-800 hover:bg-primary   hover:text-background transition-colors duration-300 relative group`}
    >
      <Image
        className="absolute w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"
        src={assets.images.bg.category_card}
        width={174}
        height={134}
        alt=""
      />
      <PiBread size={50} />
      <h3 className=" text-[15px] font-semibold">Breakfast</h3>
    </Link>
  );
};

export default HomePageCategoryCard;
