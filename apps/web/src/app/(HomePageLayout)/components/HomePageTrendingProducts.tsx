import Image from "next/image";
import SidebarSectionHeader from "./SidebarSectionHeader";
import { cn } from "@/libs/utils";

const HomePageTrendingProducts = () => {
  return (
    <div className="bg-gray-100 p-6 pb-2 rounded-md">
      <SidebarSectionHeader level="Trending Products" />
      {/* trending products */}
      <div>
        {Array.from({ length: 4 }).map((_item, i) => (
          <div className="flex gap-6 items-center" key={i}>
            {/* image    */}
            <Image
              className="h-[70px] object-contain"
              src={
                "https://themes.pixelstrap.com/fastkart/assets/images/vegetable/product/24.png"
              }
              alt="products"
              width={90}
              height={70}
            />
            {/* details  */}
            <div
              className={cn(
                "py-4",
                i !== 0 && "border-t-[1.2px] border-gray-400 border-dashed"
              )}
            >
              {/* title */}
              <h6 className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[133px] font-semibold">
                Dates Medjoul Premium Imported
              </h6>
              <p className="text-gray-700 text-sm">450 G</p>
              <p className="text-primary text-sm font-semibold">$ 50.20</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePageTrendingProducts;
