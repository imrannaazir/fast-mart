"use client";
import { Rate } from "antd";

const ProductCardRate = () => {
  return (
    <div className="flex items-center justify-between">
      <Rate disabled allowHalf value={2.5} style={{ fontSize: 14, margin: 0 }} />

      <span className="text-primary">In Stock</span>
    </div>
  );
};

export default ProductCardRate;
