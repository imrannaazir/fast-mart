import { PiBread } from "react-icons/pi";

const HomePageCategoryCard = () => {
  return (
    <div className="flex gap-4  items-center justify-center flex-col bg-gray-100 w-[174px] h-[134px] rounded-md mb-10 text-gray-800">
      <PiBread size={50} />
      <h3 className=" text-[15px] font-semibold">Breakfast</h3>
    </div>
  );
};

export default HomePageCategoryCard;
