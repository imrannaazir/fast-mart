import Footer from "@/components/footer/Footer";
import Header from "@/components/navbar/Header";
import MobileMenu from "@/components/navbar/MobileMenu";
import Navbar from "@/components/navbar/Navbar";
import TopBar from "@/components/navbar/TopBar";
import Container from "@/components/ui/Container";
import { FC, Fragment, ReactNode } from "react";

type TCommonLayoutProps = {
  children: ReactNode;
};

const CommonLayout: FC<TCommonLayoutProps> = ({ children }) => {
  return (
    <Fragment>
      <div className="pb-[64px] md:pb-0">
        <TopBar />
        <Container>
          <Header />
          <Navbar />
        </Container>
        {/* breadcrumb */}
        <div className="my-5 bg-gray-100 p-10">breadcrumb</div>
        <Container>{children}</Container>
        <Footer />
      </div>
      {/* mobile menu */}
      <MobileMenu />
    </Fragment>
  );
};

export default CommonLayout;
