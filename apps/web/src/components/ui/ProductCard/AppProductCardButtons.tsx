"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Divider, message, Tooltip } from "antd";
import { IoEyeOutline } from "react-icons/io5";
import { LuRefreshCw } from "react-icons/lu";

import { light_colors } from "@/constants/colors.constant";
import { addToWishlist } from "@/actions/wishlist";
import { getErrorMessage } from "@repo/utils/functions";
import { MdFavoriteBorder } from "react-icons/md";

const AppProductButtons = ({ id }: { id: string }) => {
  const router = useRouter();

  // add product to wishlist
  const addProductToWishlist = async () => {
    const result = await addToWishlist({ productId: id });

    if (result?.success) {
      message.success(result?.message);
    } else {
      message.error(getErrorMessage(result?.message));
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
      icon: <MdFavoriteBorder size={16} />,
      onClickHandler: addProductToWishlist,
    },
  ];
  return (
    <div className="absolute -bottom-4 z-10 flex gap-1 rounded-xl bg-white px-6 py-3 opacity-0 shadow-md transition-all duration-300 group-hover:bottom-1 group-hover:opacity-100">
      {buttons.map((button, i) => (
        <React.Fragment key={button.label}>
          {i !== 0 && <Divider type="vertical" />}
          <Tooltip title={button.label} color={light_colors.primary}>
            {/* <Button> */}
            <button onClick={button.onClickHandler}>{button.icon}</button>
            {/* </Button> */}
          </Tooltip>
        </React.Fragment>
      ))}
    </div>
  );
};

export default AppProductButtons;
