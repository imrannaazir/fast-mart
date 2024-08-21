"use client";
import { useState } from "react";
import { Drawer } from "antd";
import { BiX } from "react-icons/bi";
import NavigationLinks from "./NavigationLinks";
import { PiSquaresFour } from "react-icons/pi";

const CategoryDrawer: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="lg:hidden">
      {/* trigger button */}
      <button
        onClick={showDrawer}
        className="flex items-center justify-center flex-col"
      >
        <PiSquaresFour className="w-5 h-5" />
        <span>Category</span>
      </button>

      <Drawer
        title={
          <div className="flex justify-between items-center">
            <h3 className="text-primary font-semibold">Menu</h3>
            <BiX
              size={30}
              onClick={onClose}
              className="cursor-pointer text-gray-500"
            />
          </div>
        }
        onClose={onClose}
        open={open}
        closable={false}
        placement="left"
        width={277}
      >
        <NavigationLinks />
      </Drawer>
    </div>
  );
};

export default CategoryDrawer;
