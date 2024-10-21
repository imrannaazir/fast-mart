"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Divider, message, Tooltip } from "antd";
import { IoEyeOutline } from "react-icons/io5";
import { LuRefreshCw } from "react-icons/lu";

import { light_colors } from "@/constants/colors.constant";
import { toggleProductInWishlist } from "@/actions/wishlist";
import { getErrorMessage } from "@repo/utils/functions";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useWishlist } from "@/contexts/wishlist-context";

const AppProductButtons = ({ id }: { id: string }) => {
  // chose favorite icon
  const router = useRouter();
  const { isInWishlist, setWishlist, wishlist } = useWishlist();
  const [isToggling, setIsToggling] = useState(false);
  const isWishListed = isInWishlist(id);
  const FavoriteIcon = isWishListed ? MdFavorite : MdFavoriteBorder;
  // toggle product in wish list
  const toggleWishlist = async () => {
    if (isToggling) return;
    setIsToggling(true);

    // optimistic ui update
    setWishlist((prev) => (isWishListed ? prev.filter((item) => item !== id) : [...prev, id]));

    try {
      await toggleProductInWishlist({ productId: id });
      setIsToggling(false);
    } catch (error) {
      // revert optimistic update on error
      setWishlist((prev) => (!isWishListed ? prev.filter((item) => item !== id) : [...prev, id]));
      setIsToggling(false);
    } finally {
      setIsToggling(false);
    }
  };

  const buttons = [
    {
      label: "View",
      icon: <IoEyeOutline size={18} />,
      onClickHandler: () => {
        router.push(`/products/${id}`);
      },
    },
    {
      label: "Compare",
      icon: <LuRefreshCw size={16} />,
      onClickHandler: () => {},
    },
    {
      label: "Wishlist",
      icon: <FavoriteIcon className={isWishListed ? "text-pink-600" : ""} size={16} />,
      onClickHandler: toggleWishlist,
      isLoading: false,
    },
  ];

  return (
    <div className="absolute -bottom-4 z-10 flex gap-1 rounded-xl bg-white px-6 py-3 opacity-0 shadow-md transition-all duration-300 group-hover:bottom-1 group-hover:opacity-100">
      {buttons.map((button, i) => (
        <React.Fragment key={button.label}>
          {i !== 0 && <Divider type="vertical" />}
          <Tooltip title={button.label} color={light_colors.primary}>
            {/* <Button> */}
            <button disabled={button.isLoading} onClick={button.onClickHandler}>
              {button.icon}
            </button>
            {/* </Button> */}
          </Tooltip>
        </React.Fragment>
      ))}
    </div>
  );
};

export default AppProductButtons;
