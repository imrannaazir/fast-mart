"use client";

import assets from "@/assets";
import { Dropdown, theme } from "antd";
import Image from "next/image";
import DropdownCategories, { TCollectionDropdownItemProps } from "./DropdownCategories";
import { useSession } from "next-auth/react";
const { useToken } = theme;

const NavCategories = ({ collections }: { collections: TCollectionDropdownItemProps[] }) => {
  const { token } = useToken();

  const contentStyle: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  const session = useSession();

  return (
    <div className="flex items-center gap-4">
      <Dropdown
        menu={{}}
        dropdownRender={() => (
          <div className="relative mt-3 px-4 py-5" style={contentStyle}>
            {/* problems in this compo */}
            <DropdownCategories collections={collections} />
          </div>
        )}
        placement="bottomLeft"
      >
        {/* triggered button - all categories */}
        <button className="bg-primary text-background flex items-center gap-3 rounded-md px-[27px] py-[13px] text-lg font-bold">
          <Image src={assets.svg.bars} width={24} height={24} alt="bars" />
          All Categories
        </button>
      </Dropdown>
    </div>
  );
};

export default NavCategories;
