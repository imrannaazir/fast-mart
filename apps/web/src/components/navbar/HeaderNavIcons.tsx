"use client";

import assets from "@/assets";
import { useCartList } from "@/contexts/cartlist-context";
import { useWishlist } from "@/contexts/wishlist-context";
import { cn } from "@/libs/utils";
import { Badge, Dropdown, theme } from "antd";
import { ClassValue } from "clsx";
import Image from "next/image";
import Link from "next/link";
import DropdownCart from "./DropdownCart";
import DropdownUser from "./DropdownUser";
const { useToken } = theme;
const commonStyles: ClassValue = "hidden md:block";
const HeaderNavbarIcons = () => {
  const { token } = useToken();
  const { totalItems } = useCartList();
  const { wishlist } = useWishlist();

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
        <Badge count={wishlist?.length} className="mr-2 cursor-pointer">
          <Image src={assets.svg.love} height={24} width={24} alt="love" />
        </Badge>
      </Link>
      <Divider />
      <Dropdown
        className={commonStyles}
        menu={{}}
        dropdownRender={() => (
          <div className={cn("mt-3 px-4 py-5")} style={contentStyle}>
            <DropdownCart />
          </div>
        )}
        placement="bottomRight"
      >
        <Badge count={totalItems} className="mr-2 cursor-pointer">
          <Image src={assets.svg.cart} height={24} width={24} alt="cart" />
        </Badge>
      </Dropdown>
      <Divider />
      <DropdownUser />
    </div>
  );
};

const Divider = () => {
  return <div className={cn("h-6 w-[1.5px] bg-gray-400", commonStyles)}></div>;
};

export default HeaderNavbarIcons;
