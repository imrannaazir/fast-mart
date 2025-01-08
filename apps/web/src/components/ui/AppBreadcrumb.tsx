import { cn } from "@/libs/utils";
import { Breadcrumb } from "antd";
import { ClassValue } from "clsx";
import React from "react";
import { LiaAngleRightSolid } from "react-icons/lia";
import { MdHome } from "react-icons/md";
import Container from "./Container";
export type TAppBreadcrumbItem = {
  href?: string;
  title: React.ReactNode;
};
type TAppBreadcrumbProps = {
  items: TAppBreadcrumbItem[];
  title: string;
  className?: ClassValue;
};

const AppBreadcrumb: React.FC<TAppBreadcrumbProps> = ({ items, title, className }) => {
  const breadcrumbItems: TAppBreadcrumbItem[] = [
    {
      title: <MdHome className="mt-[2px]" size={18} />,

      href: "/",
    },
    ...items,
  ];
  return (
    <section className={cn("my-6 bg-gray-100 py-9", className)}>
      <Container className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{title}</h2>
        <Breadcrumb className="font-bold" separator={<LiaAngleRightSolid className="mt-1" />} items={breadcrumbItems} />
      </Container>
    </section>
  );
};

export default AppBreadcrumb;
