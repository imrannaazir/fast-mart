import AppBreadcrumb, { TAppBreadcrumbItem } from "@/components/ui/AppBreadcrumb";
import Container from "@/components/ui/Container";
import AppProductCard from "@/components/ui/ProductCard/AppProductCard";
import { products } from "@/constants/db";

export default function WishlistPage() {
  const wishlistBreadcrumbItems: TAppBreadcrumbItem[] = [
    {
      title: "Wishlist",
      href: "/wishlist",
    },
  ];
  return (
    <>
      <AppBreadcrumb items={wishlistBreadcrumbItems} title="Wishlist" />
      <Container className="mb-6 grid grid-cols-5 gap-6">
        {products.map((product) => (
          <AppProductCard
            product={{
              compare_price: product.compare_price,
              id: product._id,
              photo: product?.media?.[0]?.url as string,
              price: product.price,
              title: product.title,
            }}
          />
        ))}
      </Container>
    </>
  );
}
