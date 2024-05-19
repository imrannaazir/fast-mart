import { AppButton } from "@/components/ui/AppButton";
import HomeSectionTop from "./HomeSectionTop";
import ProductsSliders from "./ProductsSlider";

const FoodCupBoardProducts = () => {
  return (
    <div className=" h-full flex flex-col justify-between">
      <HomeSectionTop
        heading="Food Cupboard"
        description="A virtual assistant collects the products from your list"
      />

      <ProductsSliders />

      <div className="flex justify-end pb-4">
        <AppButton className="">View More</AppButton>
      </div>
    </div>
  );
};

export default FoodCupBoardProducts;
