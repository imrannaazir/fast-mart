import Image from "next/image";
import SidebarSectionHeader from "./SidebarSectionHeader";
import { cn } from "@/libs/utils";
import apiCall from "@/libs/api";
import { TProduct } from "@repo/utils/types";

const getProducts = async () => {
  const response = await apiCall<TProduct[]>("/products", {
    next: {
      revalidate: 3600,
    },
  });

  return response.data;
};

const HomePageTrendingProducts = async () => {
  const products = ((await getProducts()) as TProduct[]) || [];
  console.log({ products });

  return (
    <div className="rounded-md bg-gray-100 p-6 pb-2">
      <SidebarSectionHeader level="Trending Products" />
      {/* trending products */}
      <div>
        {products.map((product, i) => (
          <div className="flex items-center gap-6" key={product._id}>
            {/* image    */}
            <Image
              className="h-[70px] object-contain"
              src={product.media?.[0]?.url!}
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
