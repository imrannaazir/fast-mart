"use client";
// import { useCartList } from "@/contexts/cartlist-context";
import { IoEyeOutline } from "react-icons/io5";

const ProductCardAddToCartButton = () => {
  // const { updateCartList } = useCartList();
  return (
    <div className="flex w-full items-center rounded-full bg-gray-100 p-1">
      <button className="rounded-full bg-white p-2">
        <IoEyeOutline size={16} className=" " />
      </button>
      <p>Add</p>
    </div>
  );
};

export default ProductCardAddToCartButton;
