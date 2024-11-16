import AppBreadcrumb, { TAppBreadcrumbItem } from "@/components/ui/AppBreadcrumb";
import Container from "@/components/ui/Container";

const FaqsPage = () => {
  const faqsBreadcrumbItems: TAppBreadcrumbItem[] = [
    {
      title: "FAQs",
      href: "/faqs",
    },
  ];

  return (
    <>
      <AppBreadcrumb items={faqsBreadcrumbItems} title="Track Order" />
      <Container>faqs</Container>
    </>
  );
};

export default FaqsPage;
