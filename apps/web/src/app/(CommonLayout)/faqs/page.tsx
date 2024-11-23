"use client";
import AppBreadcrumb, { TAppBreadcrumbItem } from "@/components/ui/AppBreadcrumb";
import Container from "@/components/ui/Container";
import { DownOutlined } from "@ant-design/icons";
import { Collapse, CollapseProps, theme } from "antd";
import { Headphones, HelpCircle, Rocket, Wallet } from "lucide-react";
import type { CSSProperties } from "react";
import React from "react";
import Card, { TCardProps } from "./components/card";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const getItems: (panelStyle: CSSProperties) => CollapseProps["items"] = (panelStyle) => [
  {
    key: "1",
    label: "This is panel header 1",
    children: <p>{text}</p>,
    style: panelStyle,
  },
  {
    key: "2",
    label: "This is panel header 2",
    children: <p>{text}</p>,
    style: panelStyle,
  },
  {
    key: "3",
    label: "This is panel header 3",
    children: <p>{text}</p>,
    style: panelStyle,
  },
];
const FaqsPage = () => {
  const { token } = theme.useToken();

  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };
  const faqsBreadcrumbItems: TAppBreadcrumbItem[] = [
    {
      title: "FAQs",
      href: "/faqs",
    },
  ];

  const features = [
    {
      icon: Rocket,
      title: "Getting Started",
      description: "Bring to the table win-win survival strategies to ensure proactive domination.",
    },
    {
      icon: HelpCircle,
      title: "Sales Question",
      description: "Lorizzle ipsizzle boom shackalack sit get down get down.",
    },
    {
      icon: Wallet,
      title: "Pricing & Plans",
      description: "Curabitizzle fizzle break yo neck, yall quis fo shizzle mah nizzle fo rizzle.",
    },
    {
      icon: Headphones,
      title: "Support Contact",
      description: "Gizzle fo shizzle bow wow wow bizzle leo bibendizzle check out this.",
    },
  ];

  return (
    <>
      <AppBreadcrumb items={faqsBreadcrumbItems} title="Track Order" />
      <Container>
        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card feature={feature as TCardProps} key={index} index={index} />
          ))}
        </div>

        <div className="grid grid-cols-5">
          <div className="col-span-2"></div>
          <div className="col-span-3">
            <Collapse
              bordered={false}
              defaultActiveKey={["1"]}
              expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? -180 : 0} />}
              style={{ background: token.colorBgContainer }}
              items={getItems(panelStyle)}
              expandIconPosition="end"
            />
          </div>
        </div>
      </Container>
    </>
  );
};

export default FaqsPage;
