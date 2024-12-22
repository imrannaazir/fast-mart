import AppBreadcrumb, { TAppBreadcrumbItem } from "@/components/ui/AppBreadcrumb";
import Container from "@/components/ui/Container";
import AboutHero from "./components/hero";
import Stats from "./components/stats";

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
      <Container>
        <AboutHero />
      </Container>
      <Stats />
    </>
  );
};

export default AboutPage;
