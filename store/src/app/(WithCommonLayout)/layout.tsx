import TopBar from "@/components/navbar/TopBar";
import Container from "@/components/ui/Container";
import { FC, ReactNode } from "react";

type TCommonLayoutProps = {
  children: ReactNode;
};

const CommonLayout: FC<TCommonLayoutProps> = ({ children }) => {
  return (
    <>
      <TopBar />
      <Container>
        <p>navbar</p>
        {children}
        <p>footer</p>
      </Container>
    </>
  );
};

export default CommonLayout;
