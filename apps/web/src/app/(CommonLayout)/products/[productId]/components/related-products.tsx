import HomeSectionTop from "@/app/(CommonLayout)/components/HomeSectionTop";
import { AppButton } from "@/components/ui/AppButton";
import AppProductCard from "@/components/ui/ProductCard/AppProductCard";
import { serverFetcher } from "@/libs/server-fetcher";
import { TAppProductCardProps } from "@/types";
import { TProduct } from "@repo/utils/types";
import queryString from "query-string";

const RelatedProducts = async () => {
  const query = queryString.stringify({
    limit: 5,
  });
  const response = await serverFetcher<TProduct[]>(`/products?${query}`);
  const products = response?.data;
  return (
    <div className="flex h-full flex-col justify-between">
      <HomeSectionTop
        heading="Related Products"
        description="A virtual assistant collects the products from your list"
      />

      <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products?.map((product) => {
          const { compare_price, _id, price, title, media } = product || {};
          const productCardData: TAppProductCardProps = {
            compare_price: compare_price!,
            price,
            title,
            id: _id!,
            photo: media?.[0]?.url as string,
          };
          return <AppProductCard key={product._id} product={productCardData} />;
        })}
      </div>
      <div className="mt-4 flex justify-center pb-4 md:justify-end">
        <AppButton className="">View More</AppButton>
      </div>
    </div>
  );
};

export default RelatedProducts;
