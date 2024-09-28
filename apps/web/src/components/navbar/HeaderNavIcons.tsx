"use client";

import assets from "@/assets";
import { Badge, Dropdown, theme } from "antd";
import Image from "next/image";
import Link from "next/link";
import DropdownCart from "./DropdownCart";
import DropdownUser from "./DropdownUser";
import { ClassValue } from "clsx";
import { cn } from "@/libs/utils";
const { useToken } = theme;
const commonStyles: ClassValue = "hidden md:block";
const HeaderNavbarIcons = () => {
  const { token } = useToken();

  const contentStyle: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  return (
    <div className="flex items-center gap-4">
      <Link className={commonStyles} href="/contact-us">
        <Image src={assets.svg.telephone} height={24} width={24} alt="telephone" />
      </Link>
      <Divider />
      <Link className={commonStyles} href="/wishlist">
        <Image src={assets.svg.love} height={24} width={24} alt="love" />
      </Link>
      <Divider />
      <Dropdown
        className={commonStyles}
        menu={{}}
        dropdownRender={() => (
          <div className={cn("mt-3 max-w-[320px] px-4 py-5")} style={contentStyle}>
            <DropdownCart />
          </div>
        )}
        placement="bottomRight"
      >
        <Badge count={99} className="mr-2 cursor-pointer">
          <Image src={assets.svg.cart} height={24} width={24} alt="cart" />
        </Badge>
      </Dropdown>
      <Divider />
      <Dropdown
        menu={{}}
        dropdownRender={() => (
          <div className="mt-3 max-w-[320px] px-6 py-4" style={contentStyle}>
            <DropdownUser />
          </div>
        )}
        placement="bottomRight"
      >
        <Image src={assets.svg.user} height={24} width={24} alt="user" />
      </Dropdown>
    </div>
  );
};

const Divider = () => {
  return <div className={cn("h-6 w-[1.5px] bg-gray-400", commonStyles)}></div>;
};

export default HeaderNavbarIcons;
