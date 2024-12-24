import AppBreadcrumb, { TAppBreadcrumbItem } from "@/components/ui/AppBreadcrumb";
import Container from "@/components/ui/Container";
import { TImage, TProduct } from "@repo/utils/types";
import { Fragment } from "react";
import HomePageTrendingProducts from "../../components/HomePageTrendingProducts";
import ProductBasicDescription from "../components/ProductBasicDescription";
import ProductBrandDetails from "../components/ProductBrandDetails";
import ProductDetailsTab from "../components/ProductDetailsTab";
import ProductGallery from "../components/ProductGallery";
// import StickyBox from "react-sticky-box";
import { serverFetcher } from "@/libs/server-fetcher";
import RelatedProducts from "./components/related-products";

async function getProduct(productId: string) {
  const response = await serverFetcher<TProduct>(`/products/${productId}`, {
    next: {
      revalidate: 3600,
    },
  });
  return response.data;
}

const ProductDetailsPage = async ({ params }: { params: { productId: string } }) => {
  const product = await getProduct(params.productId);

  // page breadcrumbs
  const breadcrumbItems: TAppBreadcrumbItem[] = [
    {
      title: product?.title,
    },
  ];

  if (product?.categories?.length) {
    breadcrumbItems.push({
      title: product!.categories?.[0]!.title,
      href: `/categories/${product!.categories?.[0]!._id}`,
    });
  }

  if (product?.collections?.length) {
    breadcrumbItems.push({
      title: product!.collections?.[0]!.title!,
      href: `/collections/${product!.collections?.[0]!._id}`,
    });
  }
  return (
    <Fragment>
      <AppBreadcrumb items={breadcrumbItems} title={product?.title as string} />
      <Container className="">
        <div className="relative grid grid-cols-4 pb-6">
          {/* left  */}
          <section className="col-span-3">
            <div className="grid grid-cols-2 gap-6">
              {/* product images */}
              {<ProductGallery media={product?.media as TImage[]} />}
              {/* product description */}
              <ProductBasicDescription product={product as unknown as TProduct} />
            </div>
            <ProductDetailsTab product={product as unknown as TProduct} />
          </section>
          {/* right */}
          <section className="sticky top-6 h-fit space-y-6">
            <ProductBrandDetails
              name={product?.brand?.name as string}
              description={product?.brand?.description as string}
              img={product?.brand?.logo?.url as string}
            />
            <HomePageTrendingProducts />
            {/* <StickyBox className="space-y-6" offsetTop={24}>
            </StickyBox> */}
          </section>
        </div>
        <RelatedProducts />
      </Container>
    </Fragment>
  );
};

export default ProductDetailsPage;
