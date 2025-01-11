"use client";
import { TBrand } from "@repo/utils/types";
import { Button, Drawer } from "antd";
import { PanelRight } from "lucide-react";
import React, { useState } from "react";
import { BiX } from "react-icons/bi";
import NavigationLinks from "./NavigationLinks";

type TMobileNavMenuDrawerProps = {
  brands: TBrand[];
};

const MobileNavMenuDrawer: React.FC<TMobileNavMenuDrawerProps> = ({ brands }) => {
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
      <Button onClick={showDrawer} variant="outlined" icon={<PanelRight size={14} />} size={"middle"} />

      <Drawer
        title={
          <div className="flex items-center justify-between">
            <h3 className="text-primary font-semibold">Menu</h3>
            <BiX size={30} onClick={onClose} className="cursor-pointer text-gray-500" />
          </div>
        }
        onClose={onClose}
        open={open}
        closable={false}
        placement="left"
        width={277}
      >
        <NavigationLinks brands={brands} />
      </Drawer>
    </div>
  );
};

export default MobileNavMenuDrawer;
