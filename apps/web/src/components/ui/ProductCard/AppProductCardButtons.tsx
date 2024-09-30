"use client";
import assets from "@/assets";
import { Divider, Tooltip } from "antd";
import Image from "next/image";
import { IoEyeOutline } from "react-icons/io5";
import { LuRefreshCw } from "react-icons/lu";
import { light_colors } from "@/constants/colors.constant";
import { useRouter } from "next/navigation";
import React from "react";
import { addToWishlist } from "@/actions/wishlist";

const AppProductButtons = ({ id }: { id: string }) => {
  const router = useRouter();

  // add product to wishlist
  const addProductToWishlist = async () => {
    const result = await addToWishlist({ productId: "66f2923ac1b98bb510d364e2" });
    console.log({ result });
  };

  const buttons = [
    {
      id: 1,
      label: "View",
      icon: <IoEyeOutline size={18} />,
      onClickHandler: () => {
        router.push(`/products/${id}`);
      },
    },
    {
      id: 2,
      label: "Compare",
      icon: <LuRefreshCw size={16} />,
      onClickHandler: () => {},
    },
    {
      id: 3,
      label: "Wishlist",
      icon: <Image src={assets.svg.love} alt="wishlist" width={16} height={16} />,
      onClickHandler: addProductToWishlist,
    },
  ];
  return (
    <div className="absolute -bottom-4 z-10 flex gap-1 rounded-xl bg-white px-6 py-3 opacity-0 shadow-md transition-all duration-300 group-hover:bottom-1 group-hover:opacity-100">
      {buttons.map((button, i) => (
        <React.Fragment key={i}>
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
