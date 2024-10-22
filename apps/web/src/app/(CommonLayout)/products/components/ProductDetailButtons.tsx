"use client";
import { useWishlist } from "@/contexts/wishlist-context";
import { Button, Divider } from "antd";
import { Fragment, useCallback } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { LuRefreshCw } from "react-icons/lu";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

const ProductDetailButtons = ({ productId }: { productId: string }) => {
  const { isInWishlist, toggleWishlist, isToggling } = useWishlist();

  const handleToggleWishlist = useCallback(() => {
    toggleWishlist(productId);
  }, [toggleWishlist, productId]);

  const FavoriteIcon = isInWishlist(productId) ? MdFavorite : MdFavoriteBorder;

  return (
    <Fragment>
      <div className="mt-6 grid w-full grid-cols-2 gap-4">
        {/* cart button */}
        <div className="flex w-full items-center justify-between rounded-md bg-gray-100 p-1">
          <button className="rounded-md bg-white p-3">
            <FaMinus size={10} className="text-primary" />
          </button>
          <p>Add To Cart</p>
          <button className="rounded-md bg-white p-3">
            <FaPlus size={10} className="text-primary" />
          </button>
        </div>
        {/* Buy now button */}
        <Button type="primary" size="large" className="">
          Buy Now
        </Button>
      </div>
      <Divider className="mb-3" />
      <div>
        {/* add to cart */}
        <Button disabled={isToggling} type="link" className="text-foreground" onClick={handleToggleWishlist}>
          <FavoriteIcon className={isInWishlist(productId) ? "text-pink-600" : ""} size={16} />{" "}
          <span>{isInWishlist(productId) ? "Remove from Wishlist" : "Add To Wishlist"}</span>
        </Button>
        <Button type="link" className="text-foreground">
          <LuRefreshCw size={16} />
          <span>Add To Compare</span>
        </Button>
      </div>
      <Divider className="mt-3" />
    </Fragment>
  );
};

export default ProductDetailButtons;
