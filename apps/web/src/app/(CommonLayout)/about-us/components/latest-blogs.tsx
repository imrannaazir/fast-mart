import AppBlogCard from "@/components/ui/AppBlogCard";
import Container from "@/components/ui/Container";
import SectionTitle from "./stats-title";

const LatestBlogs = () => {
  return (
    <Container className="py-20">
      <SectionTitle subtitle="Our Blog" title="Our Latest Blog" />
      <div className="mt-12 grid grid-cols-5 gap-6">
        {[...Array(5)].map((_, i) => (
          <AppBlogCard key={i} />
        ))}
      </div>
    </Container>
  );
};

export default LatestBlogs;
