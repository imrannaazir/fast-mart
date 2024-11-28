"use client";
import AppBreadcrumb, { TAppBreadcrumbItem } from "@/components/ui/AppBreadcrumb";
import Container from "@/components/ui/Container";
import { DownOutlined } from "@ant-design/icons";
import { Collapse, CollapseProps, theme } from "antd";
import { Headphones, HelpCircle, Rocket, Wallet } from "lucide-react";
import Link from "next/link";
import type { CSSProperties } from "react";
import React from "react";
import Card, { TCardProps } from "./components/card";

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
const getItems: (panelStyle: CSSProperties) => CollapseProps["items"] = (panelStyle) => [
  {
    key: "1",
    label: <h3 className="text-lg font-semibold">What is Fastkart and why was the name changed?</h3>,
    children: (
      <p>
        Fastkart is leading the charge in transforming India's vast, unorganised grocery landscape through cutting-edge
        technology and innovation. Blinkit is India's largest and most convenient hyper-local delivery company, which
        enables you to order grocery, fruits &amp; vegetables, and other daily essential products, directly via your
        mobile or web browser.
        <br />
        To know the reason why we changed our brand name from Grofers to Fastkart, read this.
      </p>
    ),
    style: panelStyle,
  },
  {
    key: "2",
    label: <h3 className="text-lg font-semibold">How to remove the impurities of Graphene oxide?</h3>,
    children: (
      <p>
        Discover, Explore &amp; Understanding The Product Description. Maecenas ullamcorper eros libero, facilisis
        tempor mi dapibus vel. Sed ut felis ligula. Pellentesque vestibulum, tellus id euismod aliquet, justo velit
        tincidunt justo, nec pulvinar tortor elit vitae urna.
      </p>
    ),
    style: panelStyle,
  },
  {
    key: "3",
    label: <h3 className="text-lg font-semibold">How long will delivery take?</h3>,
    children: (
      <p>
        Discover, Explore &amp; Understanding The Product Description. Maecenas ullamcorper eros libero, facilisis
        tempor mi dapibus vel. Sed ut felis ligula. Pellentesque vestibulum, tellus id euismod aliquet, justo velit
        tincidunt justo, nec pulvinar tortor elit vitae urna.
      </p>
    ),
    style: panelStyle,
  },
  {
    key: "4",
    label: <h3 className="text-lg font-semibold">How do I find my Windows Product key?</h3>,
    children: (
      <p>
        The product key is located inside the product packaging, on the receipt or confirmation page for a digital
        purchase or in a confirmation email that shows you purchased Windows. If you purchased a digital copy from
        Microsoft Store, you can locate your product key in your Account under Digital Content.
      </p>
    ),
    style: panelStyle,
  },
  {
    key: "5",
    label: <h3 className="text-lg font-semibold">I've downloaded an ISO file, now what?</h3>,
    children: (
      <p>
        You can use the ISO file to create bootable media for installation or recovery. You can also install Windows on
        your current device by opening the ISO file, selecting the Setup, and following the instructions.
        <br />
        To create bootable media such as a bootable USB drive or DVD, you will need an ISO burning or mounting software.
        We recommend always using a blank USB or blank DVD because contents may be deleted when creating a bootable
        image.
      </p>
    ),
    style: panelStyle,
  },
  {
    key: "6",
    label: (
      <h3 className="text-lg font-semibold">What's the difference between 32-bit and 64-bit versions of Windows?</h3>
    ),
    children: (
      <p>
        The terms 32-bit and 64-bit refer to the way a computer's processor (also called a CPU) handles information. The
        64-bit version of Windows handles large amounts of random access memory (RAM) more effectively than a 32-bit
        system. Not all devices can run the 64-bit versions of Windows.
      </p>
    ),
    style: panelStyle,
  },
  {
    key: "7",
    label: <h3 className="text-lg font-semibold">Questionnaire on online shopping behavior during COVID-19.</h3>,
    children: (
      <p>
        Fastkart is leading the charge in transforming India's vast, unorganised grocery landscape through cutting-edge
        technology and innovation. Blinkit is India's largest and most convenient hyper-local delivery company, which
        enables you to order grocery, fruits &amp; vegetables, and other daily essential products, directly via your
        mobile or web browser.
        <br />
        To know the reason why we changed our brand name from Grofers to Fastkart, read this.
      </p>
    ),
    style: panelStyle,
  },
  {
    key: "8",
    label: <h3 className="text-lg font-semibold">How Can I Get More Attention From Customers?</h3>,
    children: (
      <p>
        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in
        some form, by injected humour, or randomised words which don't look even slightly believable. If you are going
        to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of
        text.
      </p>
    ),
    style: panelStyle,
  },
  {
    key: "9",
    label: <h3 className="text-lg font-semibold">What is the payment method?</h3>,
    children: (
      <p>
        Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
        text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
        specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem
        Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of
        Lorem Ipsum.
      </p>
    ),
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
          <div className="sticky top-4 col-span-2 h-fit py-4">
            <h1 className="text-5xl font-bold">Frequently Asked Questions</h1>
            <p className="mt-2 text-gray-500">
              We are answering most frequent questions. No worries if you not find exact one. You can find out more by
              searching or continuing clicking button below or directly{" "}
              <Link className="text-primary underline" href={"/contact"}>
                contact our support.
              </Link>
            </p>
          </div>
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
