"use client";
import { FaMinus, FaPlus } from "react-icons/fa";

const ProductCardAddToCartButton = () => {
  return (
    <div className="flex w-full items-center justify-between rounded-full bg-gray-100 p-1">
      <button className="rounded-full bg-white p-3">
        <FaMinus size={10} className="text-primary" />
      </button>
      <p>Add</p>
      <button className="rounded-full bg-white p-3">
        <FaPlus size={10} className="text-primary" />
      </button>
    </div>
  );
};

export default ProductCardAddToCartButton;
