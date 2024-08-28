import Container from "@/components/ui/Container";
import HomeSectionLayout from "@/components/ui/HomeSectionLayout";
import React from "react";

const SearchPage = () => {
  return (
    <Container className="flex">
      {/* left */}
      <aside className="w-[236px] bg-red-300"> Side bar</aside>
      {/* right */}
      <section className="w-full bg-green-400">Content</section>
    </Container>
  );
};

export default SearchPage;
