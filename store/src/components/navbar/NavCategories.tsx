"use client";

import assets from "@/assets";
import { Dropdown, theme } from "antd";
import Image from "next/image";
import DropdownCategories from "./DropdownCategories";
const { useToken } = theme;

const NavCategories = () => {
  const { token } = useToken();

  const contentStyle: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  return (
    <div className="flex items-center gap-4">
      <Dropdown
        menu={{}}
        dropdownRender={() => (
          <div className="px-4 py-5   mt-3" style={contentStyle}>
            <DropdownCategories />
          </div>
        )}
        placement="bottomLeft"
      >
        {/* triggered button - all categories */}
        <button className="bg-primary flex text-background items-center text-lg font-bold px-[27px] py-[13px] gap-3 rounded-md">
          <Image src={assets.svg.bars} alt="bars" />
          All Categories
        </button>
      </Dropdown>
    </div>
  );
};

export default NavCategories;
