"use client";
import { cn } from "@/libs/utils";
import { TBrand, TCategory, TCollection } from "@repo/utils/types";
import { Button, Drawer, Space } from "antd";
import { ClassValue } from "clsx";
import { Filter } from "lucide-react";
import React, { useState } from "react";
import SideBarFilter from "./SideBarFilter";
import ClearFilterButton from "./clear-filter-button";

type TMobileFilterMenuProps = {
  className?: ClassValue;
  maxPrice: number;
  brands: TBrand[];
  collections: TCollection[];
  categories: TCategory[];
};
const MobileFilterMenu: React.FC<TMobileFilterMenuProps> = ({
  className,
  brands,
  categories,
  collections,
  maxPrice,
}) => {
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className={cn(className)}>
      <Space>
        <Button icon={<Filter size={14} />} iconPosition="start" type="primary" onClick={() => setOpen(!open)}>
          Filter Menu
        </Button>
      </Space>
      <Drawer
        extra={<ClearFilterButton maxPrice={maxPrice} />}
        title="Filter"
        placement="left"
        size={"default"}
        onClose={onClose}
        open={open}
      >
        <SideBarFilter
          brands={brands}
          collections={collections}
          categories={categories}
          maxPrice={maxPrice}
          header="hide"
        />
      </Drawer>
    </div>
  );
};

export default MobileFilterMenu;
