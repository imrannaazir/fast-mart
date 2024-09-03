"use client";
import AppBreadcrumb, { TAppBreadcrumbItem } from "@/components/ui/AppBreadcrumb";
import Container from "@/components/ui/Container";
import { products } from "@/constants/db";
import { Fragment } from "react";
import HomePageTrendingProducts from "../../components/HomePageTrendingProducts";
import ProductBrandDetails from "../components/ProductBrandDetails";
import ProductBasicDescription from "../components/ProductBasicDescription";
import { TImage, TProduct } from "@repo/utils/types";
import ProductGallery from "../components/ProductGallery";
import ProductDetailsTab from "../components/ProductDetailsTab";
import StickyBox from "react-sticky-box";
import HomeSectionTop from "../../components/HomeSectionTop";
import { AppButton } from "@/components/ui/AppButton";
import AppProductCard from "@/components/ui/ProductCard/AppProductCard";

const ProductDetailsPage = () => {
  const product = products[0];
  // page breadcrumbs
  const breadcrumbItems: TAppBreadcrumbItem[] = [
    {
      title: product!.collections[0]!.title,
      href: `/collections/${product!.collections[0]!._id}`,
    },
    {
      title: product!.categories[0]!.title,
      href: `/collections/${product!.categories[0]!._id}`,
    },
    {
      title: product?.title,
    },
  ];

  return (
    <Fragment>
      <AppBreadcrumb items={breadcrumbItems} title={product?.title as string} />
      <Container className="">
        <div className="grid grid-cols-4 pb-6">
          {/* left  */}
          <section className="col-span-3">
            <div className="grid grid-cols-2 gap-6">
              {/* product images */}
              {<ProductGallery sliderImages={product?.media as TImage[]} />}
              {/* product description */}
              <ProductBasicDescription product={product as unknown as TProduct} />
            </div>
            <ProductDetailsTab product={product as unknown as TProduct} />
          </section>
          {/* right */}
          <section>
            <StickyBox className="space-y-6" offsetTop={24}>
              <ProductBrandDetails
                name={product?.brand?.name as string}
                description={product?.brand?.description as string}
                img={product?.brand?.logo?.url as string}
              />
              <HomePageTrendingProducts />
            </StickyBox>
          </section>
        </div>
        {/* related products */}
        <div className="flex h-full flex-col justify-between">
          <HomeSectionTop
            heading="Related Products"
            description="A virtual assistant collects the products from your list"
          />

          <div className="mt-6 grid grid-cols-5 gap-4">
            {new Array(5).fill(null).map((item, i) => (
              <AppProductCard
                key={i}
                product={{
                  compare_price: "54",
                  id: "1",
                  photo: "https://themes.pixelstrap.com/fastkart/assets/images/cake/product/2.png",
                  price: 45,
                  title: "Chocolate Brownie Cake",
                }}
              />
            ))}
          </div>
          <div className="mt-4 flex justify-center pb-4 md:justify-end">
            <AppButton className="">View More</AppButton>
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default ProductDetailsPage;
