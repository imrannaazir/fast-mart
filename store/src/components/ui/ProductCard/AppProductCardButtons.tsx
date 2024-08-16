"use client";
import assets from "@/assets";
import { Divider, Tooltip } from "antd";
import Image from "next/image";
import { IoEyeOutline } from "react-icons/io5";
import { LuRefreshCw } from "react-icons/lu";
import { light_colors } from "../../../../constant/colors.constant";
import { useRouter } from "next/navigation";
import React from "react";

const AppProductButtons = ({ id }: { id: string }) => {
  const router = useRouter();

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
      icon: (
        <Image src={assets.svg.love} alt="wishlist" width={16} height={16} />
      ),
      onClickHandler: () => {},
    },
  ];
  return (
    <div className="absolute  z-10 bg-white py-3 px-6 rounded-xl shadow-md -bottom-4   group-hover:bottom-1 opacity-0 group-hover:opacity-100 flex gap-1 transition-all duration-300">
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
