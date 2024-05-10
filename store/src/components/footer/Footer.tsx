import { Divider } from "antd";
import Container from "../ui/Container";
import FooterServiceContain from "./FooterServiceContain";
import MainFooter from "./MainFooter";
import FooterBottom from "./FooterBottom";

const Footer = () => {
  return (
    <footer className=" bg-gray-100 ">
      <Container>
        {/* service contain */}
        <FooterServiceContain />
        <Divider type="horizontal" style={{ borderTop: "1px dashed gray" }} />
        <MainFooter />
        <Divider type="horizontal" style={{ borderTop: "1px dashed gray" }} />
        <FooterBottom />
      </Container>
    </footer>
  );
};

export default Footer;
