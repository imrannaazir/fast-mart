"use client";
import { useCartList } from "@/contexts/cartlist-context";
import { useWishlist } from "@/contexts/wishlist-context";
import { cn } from "@/libs/utils";
import { compareTwoArrayOfString, debounce } from "@repo/utils/functions";
import { CartActionType, TProduct } from "@repo/utils/types";
import { Button, Divider } from "antd";
import { Info } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { LuRefreshCw } from "react-icons/lu";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

const ProductDetailButtons = (product: TProduct) => {
  const { isInWishlist, toggleWishlist, isToggling } = useWishlist();
  const searchParams = useSearchParams();
  const stringSearchParams = searchParams.toString();

  const selectedVariants = stringSearchParams ? stringSearchParams.split("&") : [];

  // handle toggle product  in wishlist
  const handleToggleWishlist = useCallback(() => {
    toggleWishlist(product?._id!);
  }, [toggleWishlist, product?._id]);

  const FavoriteIcon = isInWishlist(product?._id!) ? MdFavorite : MdFavoriteBorder;

  const isAllVariantSelected =
    product?.variants?.length === 0 ? true : product?.variants?.length === selectedVariants?.length ? true : false;

  const { updateCartList, isInCart, cartList } = useCartList();
  const selectedCartItem = cartList?.find(
    (cartItem) => cartItem?.productId === product?._id && compareTwoArrayOfString(cartItem?.options!, selectedVariants)
  );
  console.log({
    selectedCartItem,
  });

  // handle  add to cart
  const handleCart = (type: CartActionType) => {
    updateCartList({
      options: selectedVariants || [],
      productId: product?._id!,
      productImg: product?.media?.[0]?.url!,
      productPrice: product?.price!,
      productTitle: product?.title!,
      type: type,
    });
  };

  // Add to cart
  const addToCart = debounce(() => handleCart("add"), 300);

  // decrement from cart
  const decrementFromCart = debounce(() => handleCart("decrement"), 300);

  return (
    <div>
      {/* error message */}
      {!isAllVariantSelected && (
        <p className="mt-4 flex items-center gap-1 text-red-500">
          {" "}
          <Info size={12} /> Please select all variants.
        </p>
      )}
      <div className={cn("flex w-full gap-4", isAllVariantSelected ? "mt-6" : "mt-4")}>
        {/* cart button */}
        <div className="flex w-full items-center justify-between rounded-md bg-gray-100 p-1">
          <Button
            onClick={decrementFromCart}
            disabled={!isAllVariantSelected || !isInCart(product?._id!)}
            type="primary"
            icon={<FaMinus size={12} />}
            size={"middle"}
          />
          <p className="text-sm font-semibold">{selectedCartItem?.quantity || "Add To Cart"}</p>
          <Button
            onClick={addToCart}
            disabled={!isAllVariantSelected}
            type="primary"
            icon={<FaPlus size={12} />}
            size={"middle"}
          />
        </div>

        {/* Buy now button */}
        <Link href={"/cart"}>
          <Button type="primary" size="large" className="">
            Buy Now
          </Button>
        </Link>
      </div>

      <Divider className="mb-3" />
      <div>
        {/* add to cart */}
        <Button disabled={isToggling} type="link" className="text-foreground" onClick={handleToggleWishlist}>
          <FavoriteIcon className={isInWishlist(product?._id!) ? "text-pink-600" : ""} size={16} />{" "}
          <span>{isInWishlist(product?._id!) ? "Remove from Wishlist" : "Add To Wishlist"}</span>
        </Button>
        <Button type="link" className="text-foreground">
          <LuRefreshCw size={16} />
          <span>Add To Compare</span>
        </Button>
      </div>
      <Divider className="mt-3" />
    </div>
  );
};

export default ProductDetailButtons;
