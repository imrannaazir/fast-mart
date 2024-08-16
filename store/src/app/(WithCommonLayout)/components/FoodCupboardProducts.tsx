import { AppButton } from "@/components/ui/AppButton";
import HomeSectionTop from "./HomeSectionTop";
import ProductsSliders from "./ProductsSlider";
import { TAppProductCardProps } from "@/types";
import { products } from "../../../../db";

/* const baseApi = process.env.NEXT_PUBLIC_DB_URL;

// fetching products
const getProducts = async () => {
  const res = await fetch(`${baseApi}/products`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch products!");
  }
  const data = await res.json();
  return data?.data;
}; */
const FoodCupBoardProducts = async () => {
  // const products = await getProducts();

  const productsForCard: TAppProductCardProps[] = products?.map(
    (product: any) => ({
      id: product?._id,
      title: product?.title,
      price: product?.price,
      compare_price: product?.compare_price,
      photo: product?.media?.[0]?.url,
    })
  );
  return (
    <div className=" h-full flex flex-col justify-between">
      <HomeSectionTop
        heading="Food Cupboard"
        description="A virtual assistant collects the products from your list"
      />

      <ProductsSliders products={productsForCard} />

      <div className="flex justify-center md:justify-end pb-4 mt-4">
        <AppButton className="">View More</AppButton>
      </div>
    </div>
  );
};

export default FoodCupBoardProducts;
