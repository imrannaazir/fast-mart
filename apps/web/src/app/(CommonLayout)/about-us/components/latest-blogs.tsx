import AppBlogCard from "@/components/ui/AppBlogCard";
import Container from "@/components/ui/Container";
import { Carousel } from "antd";
import SectionTitle from "./stats-title";

const LatestBlogs = () => {
  return (
    <Container className="py-20">
      <SectionTitle subtitle="Our Blog" title="Our Latest Blog" />
      <div className="mt-12">
        <Carousel
          className=""
          autoplay
          dots={{ className: "custom-dots" }}
          slidesToShow={3}
          responsive={[
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 640,
              settings: {
                slidesToShow: 1,
              },
            },
          ]}
        >
          {[...Array(5)].map((_, i) => (
            <div className="px-4">
              <AppBlogCard key={i} />
            </div>
          ))}
        </Carousel>
      </div>
    </Container>
  );
};

export default LatestBlogs;
