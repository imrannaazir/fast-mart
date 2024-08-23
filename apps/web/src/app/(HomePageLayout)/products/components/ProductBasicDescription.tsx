import { TProduct, TProductVariant, TVariant } from "@repo/utils/types";
import { Button, Divider, Rate } from "antd";
import { FC } from "react";

const ProductBasicDescription = ({ product }: { product: TProduct }) => {
  console.log(product?.variants);

  return (
    <div className="pr-6">
      {/* offer */}
      <p className="text-secondary bg-secondary/10 w-fit rounded-md px-[15px] py-[9px] text-sm">30% Off</p>
      {/* name */}
      <h2 className="mt-5 text-2xl font-bold">Full Sleeve T Shirts for Men</h2>
      {/* price and rating */}
      <div className="mt-3 flex items-center justify-between">
        {/* price  */}
        <div className="flex items-center gap-2">
          <h3 className="text-primary text-xl font-semibold">$49.50</h3>
          <del className="text-gray-500">$58.46 </del>
          <p className="text-primary">(8% Off)</p>
        </div>
        {/* rating */}
        <div className="flex items-center gap-2">
          <Rate value={4.2} style={{ fontSize: 16 }} />
          <span className="text-sm font-semibold text-gray-700">23 Review</span>
        </div>
      </div>
      {/* description */}
      <p className="mt-4 text-gray-700">
        I find great comfort in awkwardness. I have never been cool, but I have felt cool. I have been in the cool spot,
        but I was not really cool; I was just trying to be hip or cool.
      </p>
      <Divider />
      {/* variants */}
      {product?.variants.map((variant) => (
        <div>
          <h3>{variant?.variantId?.variant_name}</h3>
          <div className="flex flex-wrap gap-2">
            {variant?.options?.map((option) => <Button type="primary">{option?.option_name}</Button>)}
          </div>
        </div>
      ))}
      {/* payment secure */}
    </div>
  );
};

export default ProductBasicDescription;
