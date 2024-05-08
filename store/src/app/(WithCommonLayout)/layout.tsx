import Header from "@/components/navbar/Header";
import Navbar from "@/components/navbar/Navbar";
import TopBar from "@/components/navbar/TopBar";
import Container from "@/components/ui/Container";
import { FC, ReactNode } from "react";

type TCommonLayoutProps = {
  children: ReactNode;
};

const CommonLayout: FC<TCommonLayoutProps> = ({ children }) => {
  return (
    <div>
      <TopBar />
      <Container>
        <Header />
        <Navbar />
        <p>navbar</p>
        {children}
        <p>footer</p>
      </Container>
    </div>
  );
};

export default CommonLayout;
