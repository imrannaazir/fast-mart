import AppBreadcrumb, { TAppBreadcrumbItem } from "@/components/ui/AppBreadcrumb";
import Container from "@/components/ui/Container";

const AboutPage = () => {
  const aboutPageBreadcrumbsItems: TAppBreadcrumbItem[] = [
    {
      title: "About Us",
      href: "/about-us",
    },
  ];

  return (
    <>
      <AppBreadcrumb items={aboutPageBreadcrumbsItems} title="About Us" />
      <Container>About us</Container>
    </>
  );
};

export default AboutPage;
