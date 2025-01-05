import AppBreadcrumb, { TAppBreadcrumbItem } from "@/components/ui/AppBreadcrumb";
import Container from "@/components/ui/Container";
import { TProduct } from "@repo/utils/types";
import { Fragment } from "react";
// import StickyBox from "react-sticky-box";
import { serverFetcher } from "@/libs/server-fetcher";
import ProductImageGallery from "../components/ProductGallery";
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
      <AppBreadcrumb className="hidden sm:block" items={breadcrumbItems} title={product?.title as string} />
      <Container className="">
        <ProductImageGallery media={product?.media!} />

        <RelatedProducts />
      </Container>
    </Fragment>
  );
};

export default ProductDetailsPage;
/* 

 <Fragment>
      <AppBreadcrumb className="hidden sm:block" items={breadcrumbItems} title={product?.title as string} />
      <Container className="">
        <div className="grid lg:grid-cols-3 lg:gap-4">
          <div className="grid lg:col-span-2 lg:grid-cols-2 lg:gap-4">
            <ProductImageGallery media={product?.media!} />
            <div>
              <ProductBasicDescription product={product!} />
              <ProductDetailsTab product={product!} />
            </div>
          </div>
          <div className="hidden space-y-4 lg:block">
            <ProductBrandDetails
              name={product?.brand?.name!}
              description={product?.brand?.description!}
              img={product?.brand?.logo?.url!}
            />
            <HomePageTrendingProducts />
          </div>
        </div>
        <RelatedProducts />
      </Container>
    </Fragment>
*/
