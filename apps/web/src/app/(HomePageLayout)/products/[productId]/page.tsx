"use client";
import AppBreadcrumb, { TAppBreadcrumbItem } from "@/components/ui/AppBreadcrumb";
import Container from "@/components/ui/Container";
import { products } from "@/constants/db";
import { Fragment } from "react";
import HomePageTrendingProducts from "../../components/HomePageTrendingProducts";
import ProductBrandDetails from "../components/ProductBrandDetails";
import ProductBasicDescription from "../components/ProductBasicDescription";
import { TProduct } from "@repo/utils/types";
import ProductGallery from "../components/ProductGallery";

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
        <div className="grid grid-cols-4">
          {/* left  */}
          <section className="col-span-3 grid grid-cols-2 gap-6">
            {/* product images */}
            {<ProductGallery />}
            {/* product description */}
            <ProductBasicDescription product={product as unknown as TProduct} />{" "}
          </section>
          {/* right */}
          <section className="space-y-6">
            <ProductBrandDetails
              name={product?.brand?.name as string}
              description={product?.brand?.description as string}
              img={product?.brand?.logo?.url as string}
            />
            <HomePageTrendingProducts />
          </section>
        </div>
      </Container>
    </Fragment>
  );
};

export default ProductDetailsPage;
