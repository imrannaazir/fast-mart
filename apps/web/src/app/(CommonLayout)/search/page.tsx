import AppBreadcrumb, { TAppBreadcrumbItem } from "@/components/ui/AppBreadcrumb";
import Container from "@/components/ui/Container";
import React from "react";

const SearchPage = ({ searchParams }: { searchParams: { q: string } }) => {
  const searchBreadcrumbItems: TAppBreadcrumbItem[] = [
    {
      title: "Search",
      href: "/search",
    },
  ];
  console.log(searchParams?.q);

  return (
    <>
      <AppBreadcrumb title={`Search Results for "${searchParams.q}"`} items={searchBreadcrumbItems} />
      <Container className="flex">
        {/* left */}
        <aside className="w-[236px] bg-red-300"> Side bar</aside>
        {/* right */}
        <section className="w-full bg-green-400">Content</section>
      </Container>
    </>
  );
};

export default SearchPage;
