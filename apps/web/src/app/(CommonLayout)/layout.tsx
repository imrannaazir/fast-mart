import Footer from "@/components/footer/Footer";
import Header from "@/components/navbar/Header";
import MobileMenu from "@/components/navbar/MobileMenu";
import Navbar from "@/components/navbar/Navbar";
import TopBar from "@/components/navbar/TopBar";
import AppBreadcrumb from "@/components/ui/AppBreadcrumb";
import Container from "@/components/ui/Container";
import { FC, Fragment, ReactNode } from "react";
import { HomeOutlined } from "@ant-design/icons";

type TCommonLayoutProps = {
  children: ReactNode;
};

const CommonLayout: FC<TCommonLayoutProps> = ({ children }) => {
  const items = [
    {
      href: "/",
      title: <HomeOutlined />,
    },
    {
      href: "/product/new",
      title: "Application List",
    },
    {
      title: "Application",
    },
  ];
  return (
    <Fragment>
      <div className="pb-[64px] md:pb-0">
        <TopBar />
        <Container>
          <Header />
          <Navbar />
        </Container>
        <AppBreadcrumb items={items} />
        <Container>{children}</Container>
        <Footer />
      </div>
      {/* mobile menu */}
      <MobileMenu />
    </Fragment>
  );
};

export default CommonLayout;
