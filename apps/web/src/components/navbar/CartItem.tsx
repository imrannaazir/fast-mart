import { useCartList } from "@/contexts/cartlist-context";
import { TCartStateItem } from "@repo/utils/types";
import { Button } from "antd";
import Image from "next/image";
import { BiX } from "react-icons/bi";

const CartItem = ({ cartItem }: { cartItem: TCartStateItem }) => {
  const { productId, productPrice, productTitle, quantity, options, productImg } = cartItem;
  const { updateCartList, isLoading } = useCartList();
  // handle cart
  const handleCart = () => {
    updateCartList({
      options: options!,
      productId,
      productPrice,
      productTitle,
      productImg: productImg!,
      type: "remove",
    });
  };
  return (
    <div className="flex max-w-[320px] gap-[15px]">
      {/* image */}
      <Image className="h-[72px] w-[87px] object-cover" src={productImg!} width={87} height={72} alt="product" />
      {/* details */}
      <div className="flex flex-col items-end">
        {/* <BiX size={20} className="cursor-pointer text-gray-700" /> */}
        <Button
          disabled={isLoading}
          type="default"
          size="small"
          shape="default"
          icon={<BiX size={16} onClick={handleCart} />}
        />
        <div>
          <h3 className="text-primary w-[207px] overflow-hidden text-ellipsis whitespace-nowrap text-[16.5px] font-medium">
            {productTitle}
          </h3>
          <div className="flex gap-1 text-gray-700">
            <p className="">{quantity} x</p>
            <p className="font-medium">${productPrice}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
