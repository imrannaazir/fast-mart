"use client";
import React from "react";
import { Dropdown, theme } from "antd";
import NavigationLinkItem from "./NavigationLinkItem";
import { TLinkItem } from "@/types";
import Image from "next/image";
import Link from "next/link";
import AppLinkButton from "../ui/AppLinkButton";
import { LuImage } from "react-icons/lu";

const { useToken } = theme;

const DropdownNavigationLink = ({ link }: { link: TLinkItem }) => {
  const { token } = useToken();

  const contentStyle: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  return (
    <Dropdown
      menu={{}}
      dropdownRender={() => (
        <div
          style={contentStyle}
          className="min-w-[240px] px-6 py-4 mt-4 space-y-3"
        >
          {link.children?.map((item) => (
            <Link
              href={item.path}
              key={item.id}
              className="group text-lg flex gap-3 hover:text-gray-700 text-gray-700"
            >
              {item?.logo ? (
                <Image
                  src={item?.logo}
                  height={24}
                  width={24}
                  className="object-cover "
                  alt={item.label}
                />
              ) : (
                <div className="w-[24px] h-[24px] flex items-center justify-center bg-gray-100 rounded-md shadow-sm">
                  {" "}
                  <LuImage className="w-[14px] h-[14px]" />
                </div>
              )}
              <AppLinkButton>
                <span className="group-hover:tracking-wide transition-all duration-300">
                  {item?.label}
                </span>
              </AppLinkButton>
            </Link>
          ))}
        </div>
      )}
    >
      {/*  */}
      <div>
        <NavigationLinkItem link={link} />
      </div>
    </Dropdown>
  );
};

export default DropdownNavigationLink;
