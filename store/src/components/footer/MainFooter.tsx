import CompanyDescription from "./CompanyDescription";
import FooterContactUs from "./FooterContactUs";

const MainFooter = () => {
  return (
    <div className="grid grid-cols-5 py-4">
      <CompanyDescription />
      <div></div>
      <div></div>
      <div></div>
      <FooterContactUs />
    </div>
  );
};

export default MainFooter;
