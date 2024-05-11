import { Carousel } from "antd";
import Container from "../ui/Container";
import Link from "next/link";

const TopBar = () => {
  const sliderContents = [
    {
      id: 1,
      content: (
        <h6>
          <strong className="me-1">Welcome to Fastkart!</strong>Wrap new
          offers/gift every single day on Weekends.
          <strong className="ms-1">New Coupon Code: Fast024</strong>
        </h6>
      ),
    },
    {
      id: 1,
      content: (
        <h6>
          Something you love is now on sale!
          <Link className="ml-2 font-semibold underline" href={"#"}>
            Buy Now !
          </Link>
        </h6>
      ),
    },
  ];
  return (
    <div className="bg-primary py-2 hidden md:block ">
      <Container>
        <Carousel
          autoplay={true}
          infinite={true}
          dots={false}
          dotPosition="left"
          className="text-background"
          lazyLoad="progressive"
        >
          {sliderContents.map((item) => (
            <div className="text-center" key={item.id}>
              {item.content}
            </div>
          ))}
        </Carousel>
      </Container>
    </div>
  );
};

export default TopBar;
