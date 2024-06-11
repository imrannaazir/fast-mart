import Image from "next/image";
import AppProductButtons from "./AppProductCardButtons";
import ProductCardRate from "./ProductCardRate";
import ProductCardAddToCartButton from "./ProductCardAddToCartButton";
import { TAppProductCardProps } from "@/types";

const AppProductCard = ({ product }: { product: TAppProductCardProps }) => {
  const {
    compare_price = 0,
    id = "",
    price = 0,
    title = "",
    photo = "",
  } = product || {};
  return (
    <div className="p-3 border rounded-lg group  text-sm shadow-sm text-start min-w-[224px]">
      {/* image */}
      <div className="relative mx-auto flex w-[80%] py-3 items-center justify-center  ">
        {/* buttons */}
        <AppProductButtons id={id} />
        {photo && (
          <Image
            className="group-hover:scale-110  transition-all duration-300 w-[158px] h-[122px] object-cover"
            src={photo}
            width={158}
            height={122}
            alt={title}
          />
        )}
      </div>
      {/* info */}
      <div className="flex flex-col justify-between gap-2">
        {/* title */}
        <h5 className="font-semibold">{title}</h5>

        <div className="space-y-1">
          {/* price */}
          <p className="space-x-2">
            <span className="text-base font-bold text-primary">${price}</span>
            <del className="text-gray-500">${compare_price}</del>
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
