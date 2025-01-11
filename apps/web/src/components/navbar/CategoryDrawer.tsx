"use client";
import { TCollection } from "@repo/utils/types";
import { Drawer, Menu } from "antd";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { icons } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { BiX } from "react-icons/bi";
import { PiSquaresFour } from "react-icons/pi";
import LucidIcon from "../ui/LucidIcon";

type TCategoryDrawerProps = {
  collections: TCollection[];
};

const CategoryDrawer: React.FC<TCategoryDrawerProps> = ({ collections }) => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const items: ItemType<MenuItemType>[] =
    collections?.map((item) => {
      return {
        label: <Link href={`/search?collections=${item?._id}`}>{item?.title}</Link>,
        key: item?._id!,
        icon: <LucidIcon name={item?.icon as keyof typeof icons} />,
        children: item?.categories?.map((category) => ({
          label: <Link href={`search?collections=${item?._id}&categories=${category?._id}`}>{item?.title}</Link>,
          key: category?._id,
        })),
      };
    }) || [];

  return (
    <div className="lg:hidden">
      {/* trigger button */}
      <button onClick={showDrawer} className="flex flex-col items-center justify-center">
        <PiSquaresFour className="h-5 w-5" />
        <span>Category</span>
      </button>

      <Drawer
        title={
          <div className="flex items-center justify-between">
            <h3 className="text-primary font-semibold">Categories</h3>
            <BiX size={30} onClick={onClose} className="cursor-pointer text-gray-500" />
          </div>
        }
        onClose={onClose}
        open={open}
        closable={false}
        placement="left"
        width={277}
      >
        <Menu className="lg:hidden" style={{ border: "0px" }} mode="inline" items={items} />
      </Drawer>
    </div>
  );
};

export default CategoryDrawer;
