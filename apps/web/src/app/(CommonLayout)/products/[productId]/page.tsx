import AppBreadcrumb, { TAppBreadcrumbItem } from "@/components/ui/AppBreadcrumb";
import Container from "@/components/ui/Container";
import { TImage, TProduct } from "@repo/utils/types";
import { Fragment } from "react";
// import StickyBox from "react-sticky-box";
import { serverFetcher } from "@/libs/server-fetcher";
import HomePageTrendingProducts from "../../components/HomePageTrendingProducts";
import ProductBasicDescription from "../components/ProductBasicDescription";
import ProductBrandDetails from "../components/ProductBrandDetails";
import ProductDetailsTab from "../components/ProductDetailsTab";
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
      <Container className="space-y-4">
        {/* gallery,  details, desTab, brand  */}
        <div className="md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-3">
          {/* gallery , details, desTab */}
          <div className="space-y-4 lg:col-span-2">
            {/* gallery , details */}
            <div className="lg:grid lg:grid-cols-2 lg:gap-4">
              <ProductImageGallery media={product?.media!} />
              <ProductBasicDescription product={product!} />
            </div>
            {/*desTab  */}
            <ProductDetailsTab product={product!} />
          </div>
          {/* brand */}
          <div className="sticky top-4 hidden h-fit space-y-4 md:block">
            {product?.brand?._id && (
              <ProductBrandDetails
                name={product?.brand?.name!}
                description={product?.brand?.description!}
                img={(product?.brand?.logo as TImage)?.url!}
              />
            )}
            <HomePageTrendingProducts />
          </div>
        </div>

        <RelatedProducts />
      </Container>
    </Fragment>
  );
};

export default ProductDetailsPage;
