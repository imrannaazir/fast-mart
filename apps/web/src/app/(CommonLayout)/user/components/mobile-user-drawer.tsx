"use client";
import { cn } from "@/libs/utils";
import { Button, Drawer, Space } from "antd";
import { ClassValue } from "clsx";
import React, { useState } from "react";
import UserSidebar from "./user-sidebar";

type TMobileUserDrawerProps = {
  className?: ClassValue;
};

const MobileUserDrawer: React.FC<TMobileUserDrawerProps> = ({ className }) => {
  const [open, setOpen] = useState(false);

  const showDefaultDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <aside className={cn(className)}>
      <Space>
        <Button type="primary" onClick={showDefaultDrawer}>
          Sidebar
        </Button>
      </Space>
      <Drawer placement="left" size={"default"} onClose={onClose} open={open}>
        <UserSidebar />
      </Drawer>
    </aside>
  );
};

export default MobileUserDrawer;
