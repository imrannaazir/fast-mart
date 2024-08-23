import React from "react";
import { Breadcrumb } from "antd";
import { LiaAngleRightSolid } from "react-icons/lia";
import Container from "./Container";
import { MdHome } from "react-icons/md";
export type TAppBreadcrumbItem = {
  href?: string;
  title: React.ReactNode;
};
type TAppBreadcrumbProps = {
  items: TAppBreadcrumbItem[];
  title: string;
};

const AppBreadcrumb: React.FC<TAppBreadcrumbProps> = ({ items, title }) => {
  const breadcrumbItems: TAppBreadcrumbItem[] = [
    {
      title: <MdHome className="mt-[2px]" size={18} />,

      href: "/",
    },
    ...items,
  ];
  return (
    <section className="my-6 bg-gray-100 py-9">
      <Container className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{title}</h2>
        <Breadcrumb className="font-bold" separator={<LiaAngleRightSolid className="mt-1" />} items={breadcrumbItems} />
      </Container>
    </section>
  );
};

export default AppBreadcrumb;