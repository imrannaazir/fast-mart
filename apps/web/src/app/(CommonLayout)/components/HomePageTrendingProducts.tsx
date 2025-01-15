import assets from "@/assets";
import apiCall from "@/libs/api";
import { cn } from "@/libs/utils";
import { TProduct } from "@repo/utils/types";
import Image from "next/image";
import Link from "next/link";
import SidebarSectionHeader from "./SidebarSectionHeader";

const getProducts = async () => {
  const response = await apiCall<TProduct[]>("/products/top-products?limit=9", {
    next: {
      revalidate: 3600,
    },
  });

  return response.data;
};

const HomePageTrendingProducts = async ({ limit = 9 }: { limit?: number }) => {
  const products = ((await getProducts()) as TProduct[]) || [];

  return (
    <div className="rounded-md bg-gray-100 p-6 pb-2">
      <SidebarSectionHeader level="Trending Products" />
      {/* trending products */}
      <div>
        {products?.slice(0, limit).map?.((product, i) => {
          return (
            <div className="flex items-center gap-6" key={product._id}>
              {/* image    */}
              <Image
                className="aspect-square w-[70px] rounded-md border object-cover shadow-sm"
                src={product.media?.[0]?.url! || assets?.images?.blank_image}
                alt="products"
                width={70}
                height={70}
              />
              {/* details  */}
              <div className={cn("py-4", i !== 0 && "border-t-[1.2px] border-dashed border-gray-400")}>
                {/* title */}
                <Link href={`/products/${product?._id}`} className="max-w-[133px] font-semibold">
                  {product?.title}{" "}
                </Link>
                <p className="text-sm text-gray-700">
                  {" "}
                  {product?.weight} {product?.unit}
                </p>
                <p className="text-primary text-sm font-semibold">$ {product?.price}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomePageTrendingProducts;
