"use client";
import React from "react";
import { Dropdown, theme } from "antd";
import NavigationLinkItem from "./NavigationLinkItem";
import { TLinkItem } from "@/types";
import Image from "next/image";
import Link from "next/link";
import AppLinkButton from "../ui/AppLinkButton";

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
              <Image
                src={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf9rfH5IkGH1d4MuqVdBVm_AtcdUARHzz6mR4t1MUS3g&s"
                }
                height={24}
                width={24}
                className="object-cover "
                alt={item.label}
              />
              <AppLinkButton>
                <span className="group-hover:tracking-wide transition-all duration-300">
                  {link.label}
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
