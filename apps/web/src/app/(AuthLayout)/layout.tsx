import React, { ReactNode } from "react";
import Footer from "@/components/footer/Footer";
import Header from "@/components/navbar/Header";
import MobileMenu from "@/components/navbar/MobileMenu";
import Navbar from "@/components/navbar/Navbar";
import TopBar from "@/components/navbar/TopBar";
import Container from "@/components/ui/Container";
import { Fragment } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Fragment>
      <div className="pb-[64px] md:pb-0">
        <TopBar />
        <Container>
          <Header />
          <Navbar />
        </Container>
        {children}
        <Footer />
      </div>
      {/* mobile menu */}
      <MobileMenu />
    </Fragment>
  );
};

export default AuthLayout;
