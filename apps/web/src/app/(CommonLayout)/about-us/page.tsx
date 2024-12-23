import AppBreadcrumb, { TAppBreadcrumbItem } from "@/components/ui/AppBreadcrumb";
import AboutHero from "./components/hero";
import LatestBlogs from "./components/latest-blogs";
import Stats from "./components/stats";
import TeamSlider from "./components/team-members";
import Testimonials from "./components/testimonials";

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
      <AboutHero />
      <Stats />
      <TeamSlider />
      <Testimonials />
      <LatestBlogs />
    </>
  );
};

export default AboutPage;
