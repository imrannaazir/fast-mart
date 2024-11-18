import AppBreadcrumb, { TAppBreadcrumbItem } from "@/components/ui/AppBreadcrumb";
import Container from "@/components/ui/Container";
import { Headphones, HelpCircle, Rocket, Wallet } from "lucide-react";
import Card, { TCardProps } from "./components/card";

const FaqsPage = () => {
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
      </Container>
    </>
  );
};

export default FaqsPage;
