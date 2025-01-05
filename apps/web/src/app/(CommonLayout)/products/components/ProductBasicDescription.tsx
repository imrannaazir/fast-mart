import assets from "@/assets";
import { calculateOfferPercentage } from "@repo/utils/functions";
import { TProduct, TProductVariantOption } from "@repo/utils/types";
import { Divider, Rate } from "antd";
import ProductDetailButtons from "./ProductDetailButtons";
import ProductVariants from "./ProductVariants";

const ProductBasicDescription = ({ product }: { product: TProduct }) => {
  const offerPercentage = calculateOfferPercentage(product?.price, product?.compare_price!);

  const markupDescription = { __html: product?.description?.slice(0, 1000) || "" };

  return (
    <div className="">
      {/* offer */}
      <p className="text-secondary bg-secondary/10 w-fit rounded-md px-[15px] py-[9px] text-sm">
        {offerPercentage}% Off
      </p>
      {/* name */}
      <h2 className="mt-5 text-2xl font-bold">{product?.title}</h2>
      {/* price and rating */}
      <div className="mt-3 flex items-center justify-between">
        {/* price  */}
        <div className="flex items-center gap-2">
          <h3 className="text-primary text-xl font-semibold">${product.price}</h3>
          <del className="text-gray-500">${product?.compare_price}</del>
          <p className="text-primary">({offerPercentage}% Off)</p>
        </div>
        {/* rating */}
        <div className="flex items-center gap-2">
          <Rate value={4.2} style={{ fontSize: 16 }} />
          <span className="text-sm font-semibold text-gray-700">23 Review</span>
        </div>
      </div>
      {/* description */}
      <div className="mt-4 text-gray-700" dangerouslySetInnerHTML={markupDescription} />

      <Divider />
      {/* variants */}
      <ProductVariants variants={product?.variants as unknown as TProductVariantOption[]} />
      {/* buttons */}
      <ProductDetailButtons {...product} />
      {/* payment secure */}
      <div className="">
        <h3 className="mb-4 font-semibold">Guaranteed Safe Checkout</h3>
        <img className="w-full" src={assets.images.payment} />
      </div>
    </div>
  );
};

export default ProductBasicDescription;
