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
        <div style={contentStyle} className="mt-4 min-w-[240px] space-y-3 px-6 py-4">
          {link.children?.map((item) => (
            <Link href={item.path} key={item.id} className="group flex gap-3 text-lg text-gray-700 hover:text-gray-700">
              {item?.logo ? (
                <Image src={item?.logo} height={24} width={24} className="object-cover" alt={item.label} />
              ) : (
                <div className="flex h-[24px] w-[24px] items-center justify-center rounded-md bg-gray-100 shadow-sm">
                  {" "}
                  <LuImage className="h-[14px] w-[14px]" />
                </div>
              )}
              <AppLinkButton>
                <span className="transition-all duration-300 group-hover:tracking-wide">{item?.label}</span>
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
