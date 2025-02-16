import { useCartList } from "@/contexts/cartlist-context";
import { cn } from "@/libs/utils";
import { debounce } from "@repo/utils/functions";
import { CartActionType, TCartStateItem } from "@repo/utils/types";
import { Button, Tag } from "antd";
import { ClassValue } from "clsx";
import Image from "next/image";
import { memo } from "react";
import { BiMinus, BiPlus, BiTrash } from "react-icons/bi";

const CartItem = ({ item, className }: { item: TCartStateItem; className?: ClassValue }) => {
  const { productImg, productTitle, productId, productPrice, quantity, options } = item;
  const { isInCart, updateCartList } = useCartList();
  // handle  add to cart
  const handleCart = (type: CartActionType) => {
    updateCartList({
      options: options!,
      productId,
      productImg: productImg!,
      productPrice,
      productTitle,
      type: type,
    });
  };

  // Add to cart
  const addToCart = debounce(() => handleCart("add"), 300);

  // decrement from cart
  const decrementFromCart = debounce(() => handleCart("decrement"), 300);

  return (
    <div className={cn("flex w-full items-center justify-between rounded-lg border p-2 pr-6", className)}>
      <div className="flex items-center gap-4">
        <Image
          height={80}
          width={80}
          alt={productTitle!}
          src={productImg!}
          className="size-[80px] rounded-lg object-cover object-center"
        />

        {/* title and variants */}
        <div>
          <h2 className="text-base font-semibold">{productTitle}</h2>
          <span>
            {options!.map((variant, i) => {
              const variantName = variant.split("=");
              return (
                <Tag key={i} className="text-xs capitalize">
                  {variantName[1]}
                </Tag>
              );
            })}
          </span>
        </div>
      </div>

      {/* actions button */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center justify-between rounded-md p-1">
          <Button
            onClick={decrementFromCart}
            disabled={!isInCart(productId!)}
            type="dashed"
            icon={<BiMinus size={14} />}
            size={"middle"}
          />
          <p className="px-3 text-sm">{quantity}</p>
          <Button onClick={addToCart} type="dashed" icon={<BiPlus size={14} />} size={"middle"} />
        </div>
        {/* price  */}
        <h3 className="text-lg font-semibold">${productPrice}</h3>
        {/* delete button */}
        <Button onClick={() => handleCart("remove")} type="default" size="middle" danger icon={<BiTrash />} />
      </div>
    </div>
  );
};

export default memo(CartItem);
