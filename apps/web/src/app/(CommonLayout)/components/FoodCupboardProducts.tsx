import { AppButton } from "@/components/ui/AppButton";
import HomeSectionTop from "./HomeSectionTop";
import ProductsSliders from "./ProductsSlider";
import { TAppProductCardProps } from "@/types";
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
const FoodCupBoardProducts = async () => {
  const products = (await getProducts()) as TProduct[];

  const productsForCard: TAppProductCardProps[] = products?.map((product: any) => ({
    id: product?._id,
    title: product?.title,
    price: product?.price,
    compare_price: product?.compare_price,
    photo: product?.media?.[0]?.url,
  }));
  return (
    <div className="flex h-full flex-col justify-between">
      <HomeSectionTop heading="Food Cupboard" description="A virtual assistant collects the products from your list" />

      <ProductsSliders products={productsForCard} />

      <div className="mt-4 flex justify-center pb-4 md:justify-end">
        <AppButton className="">View More</AppButton>
      </div>
    </div>
  );
};

export default FoodCupBoardProducts;
