"use client";
import { TProduct } from "@repo/utils/types";
import { Tabs, TabsProps } from "antd";
import { FC } from "react";
import ProductAdditionalInformation from "./ProductAdditionalInformation";
import ProductReviews from "./ProductReviews";
type TProductDetailsTabProps = {
  product: TProduct;
};
const ProductDetailsTab: FC<TProductDetailsTabProps> = ({ product }) => {
  const items: TabsProps["items"] = [
    {
      label: "Description",
      key: "1",
      children: <div dangerouslySetInnerHTML={{ __html: product?.description || "" }} className="w-full" />,
    },
    {
      label: "Additional Information",
      key: "2",
      children: <ProductAdditionalInformation product={product} />,
    },
    {
      label: `Review(6)`,
      key: "3",
      children: <ProductReviews />,
    },
  ];
  return <Tabs className="" type="card" size="large" items={items} />;
};

export default ProductDetailsTab;
