import Image from "next/image";
import SidebarSectionHeader from "./SidebarSectionHeader";
import { cn } from "@/libs/utils";

const HomePageTrendingProducts = () => {
  return (
    <div className="rounded-md bg-gray-100 p-6 pb-2">
      <SidebarSectionHeader level="Trending Products" />
      {/* trending products */}
      <div>
        {Array.from({ length: 4 }).map((_item, i) => (
          <div className="flex items-center gap-6" key={i}>
            {/* image    */}
            <Image
              className="h-[70px] object-contain"
              src={"https://themes.pixelstrap.com/fastkart/assets/images/vegetable/product/24.png"}
              alt="products"
              width={90}
              height={70}
            />
            {/* details  */}
            <div className={cn("py-4", i !== 0 && "border-t-[1.2px] border-dashed border-gray-400")}>
              {/* title */}
              <h6 className="max-w-[133px] overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
                Dates Medjoul Premium Imported
              </h6>
              <p className="text-sm text-gray-700">450 G</p>
              <p className="text-primary text-sm font-semibold">$ 50.20</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePageTrendingProducts;
