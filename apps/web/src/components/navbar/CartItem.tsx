import Image from "next/image";
import { BiX } from "react-icons/bi";

const CartItem = () => {
  return (
    <div className="flex  gap-[15px] max-w-[320px]">
      {/* image */}
      <Image
        className="w-[87px] h-[72px] object-cover"
        src="https://i.pinimg.com/1200x/85/09/a1/8509a1d327f69709ee81cdf79c3a77cd.jpg"
        width={87}
        height={72}
        alt="product"
      />
      {/* details */}
      <div className="flex flex-col items-end ">
        <BiX size={20} className=" cursor-pointer text-gray-700" />
        <div>
          <h3 className="text-[16.5px] font-medium text-primary overflow-hidden text-ellipsis whitespace-nowrap w-[207px]">
            Fantasy Crunchy Choco Chip Cookies
          </h3>
          <div className="flex gap-1 text-gray-700">
            <p className="">1 x</p>
            <p className="font-medium">$80.58</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
