import Image from "next/image";
import AppProductButtons from "./AppProductCardButtons";
import ProductCardRate from "./ProductCardRate";
import ProductCardAddToCartButton from "./ProductCardAddToCartButton";

const AppProductCard = () => {
  return (
    <div className="p-3 border rounded-lg group  text-sm shadow-sm">
      {/* image */}
      <div className="relative mx-auto flex w-[80%] py-3 items-center justify-center  ">
        {/* buttons */}
        <AppProductButtons />
        <Image
          className="group-hover:scale-110  transition-all duration-300 "
          src={
            "https://themes.pixelstrap.com/fastkart/assets/images/vegetable/product/4.png"
          }
          width={169}
          height={140}
          alt="product1"
        />
      </div>
      {/* info */}
      <div className="flex flex-col justify-between gap-2">
        {/* title */}
        <h5 className="font-semibold">Dark Chocolate</h5>

        <div className="space-y-1">
          {/* price */}
          <p className="space-x-2">
            <span className="text-base font-bold text-primary">$26.59</span>
            <del className="text-gray-500">$28.59</del>
          </p>
          {/* review */}
          <ProductCardRate />
        </div>
        {/* buttons */}
        <ProductCardAddToCartButton />
      </div>
    </div>
  );
};

export default AppProductCard;
