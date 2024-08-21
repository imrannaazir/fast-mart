"use client";
import { FaMinus, FaPlus } from "react-icons/fa";

const ProductCardAddToCartButton = () => {
  return (
    <div className="flex w-full justify-between items-center bg-gray-100 p-1 rounded-full">
      <button className="bg-white p-3 rounded-full">
        <FaMinus size={10} className="text-primary" />
      </button>
      <p>Add</p>
      <button className="bg-white p-3 rounded-full">
        <FaPlus size={10} className="text-primary" />
      </button>
    </div>
  );
};

export default ProductCardAddToCartButton;
