import Footer from "@/components/footer/Footer";
import Header from "@/components/navbar/Header";
import MobileMenu from "@/components/navbar/MobileMenu";
import Navbar from "@/components/navbar/Navbar";
import TopBar from "@/components/navbar/TopBar";
import Container from "@/components/ui/Container";
import { serverFetcher } from "@/libs/server-fetcher";
import { TBrand, TCollection } from "@repo/utils/types";
import { FC, Fragment, ReactNode } from "react";

type TCommonLayoutProps = {
  children: ReactNode;
};

export async function getBrandsData() {
  const res = await serverFetcher<TBrand[]>(`/brands`, {
    next: {
      revalidate: 3600,
    },
  });

  return res.data;
}
export async function getCollectionsData() {
  const res = await serverFetcher<TCollection[]>(`/collections`, {
    next: {
      revalidate: 3600,
    },
  });

  return res.data;
}
const CommonLayout: FC<TCommonLayoutProps> = async ({ children }) => {
  // fetch brands data
  const data = await getBrandsData();
  const brands: TBrand[] = data || [];

  const collections = (await getCollectionsData()) || [];

  return (
    <Fragment>
      <div className="pb-[64px] md:pb-0">
        <TopBar />
        <Container>
          <Header brands={brands} />
          <Navbar brands={brands} collections={collections} />
        </Container>
        {children}
        <Footer />
      </div>
      {/* mobile menu */}
      <MobileMenu collections={collections} />
    </Fragment>
  );
};

export default CommonLayout;
