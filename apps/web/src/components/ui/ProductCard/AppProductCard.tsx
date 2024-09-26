import Image from "next/image";
import AppProductButtons from "./AppProductCardButtons";
import ProductCardRate from "./ProductCardRate";
import ProductCardAddToCartButton from "./ProductCardAddToCartButton";
import { TAppProductCardProps } from "@/types";
import Link from "next/link";

const AppProductCard = ({ product }: { product: TAppProductCardProps }) => {
  const { compare_price = 0, id = "", price = 0, title = "", photo = "" } = product || {};
  return (
    <div className="group min-w-[224px] rounded-lg border p-3 text-start text-sm shadow-sm">
      {/* image */}
      <div className="relative mx-auto flex w-[80%] items-center justify-center py-3">
        {/* buttons */}
        <AppProductButtons id={id} />
        {photo && (
          <Image
            className="h-[122px] w-[158px] object-cover transition-all duration-300 group-hover:scale-110"
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
        <Link href={`/products/${id}`} className="font-semibold">
          {title}
        </Link>

        <div className="space-y-1">
          {/* price */}
          <p className="space-x-2">
            <span className="text-primary text-base font-bold">${price}</span>
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
