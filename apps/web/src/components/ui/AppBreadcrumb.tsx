import React from "react";
import { Breadcrumb } from "antd";
import { LiaAngleRightSolid } from "react-icons/lia";
import Container from "./Container";

type TAppBreadcrumbProps = {
  items: {
    href?: string;
    title: React.ReactNode;
  }[];
};

const AppBreadcrumb: React.FC<TAppBreadcrumbProps> = ({ items }) => (
  <section className="my-6 bg-gray-100 py-9">
    <Container className="flex items-center justify-between">
      <h2 className="text-xl font-bold">Product Details</h2>
      <Breadcrumb className="font-bold" separator={<LiaAngleRightSolid className="mt-1" />} items={items} />
    </Container>
  </section>
);

export default AppBreadcrumb;
