import Image from "next/image";
import AppProductButtons from "./AppProductCardButtons";
import ProductCardRate from "./ProductCardRate";
// import ProductCardAddToCartButton from "./ProductCardAddToCartButton";
import { TAppProductCardProps } from "@/types";
import Link from "next/link";
import assets from "@/assets";

const AppProductCard = ({ product }: { product: TAppProductCardProps }) => {
  const { compare_price = 0, id = "", price = 0, title = "", photo = assets.images.blank_image } = product || {};
  return (
    <div className="group min-w-[224px] rounded-lg border p-3 text-start text-sm shadow-sm">
      {/* image */}
      <div className="relative mx-auto flex items-center justify-center">
        {/* buttons */}
        <AppProductButtons id={id} />
        {photo && (
          <Link href={`/products/${id}`}>
            <Image
              className="aspect-[16/14] w-full rounded-lg object-cover transition-all duration-300 group-hover:scale-105"
              src={photo}
              width={158}
              height={122}
              alt={title}
            />
          </Link>
        )}
      </div>
      {/* info */}
      <Link href={`/products/${id}`} className="flex flex-col justify-between gap-2">
        {/* title */}
        <h3 className="font-semibold">{title}</h3>

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
        {/* <ProductCardAddToCartButton /> */}
      </Link>
    </div>
  );
};

export default AppProductCard;
