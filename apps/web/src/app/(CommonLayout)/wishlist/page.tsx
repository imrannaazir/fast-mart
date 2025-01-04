import { getAllMyWishlistItems } from "@/actions/wishlist";
import AppBreadcrumb, { TAppBreadcrumbItem } from "@/components/ui/AppBreadcrumb";
import Container from "@/components/ui/Container";
import AppProductCard from "@/components/ui/ProductCard/AppProductCard";
import { TWishlistItemProduct } from "@repo/utils/types";
import { Empty } from "antd";

export default async function WishlistPage() {
  const wishlistBreadcrumbItems: TAppBreadcrumbItem[] = [
    {
      title: "Wishlist",
      href: "/wishlist",
    },
  ];
  const wishlist = await getAllMyWishlistItems();

  return (
    <>
      <AppBreadcrumb items={wishlistBreadcrumbItems} title="Wishlist" />
      <Container className="">
        {wishlist?.length ? (
          <div className="mb-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {wishlist.map((item) => {
              const { _id, title, compare_price, media, price } = (item.productId as TWishlistItemProduct) || {};

              return (
                <AppProductCard
                  className="bg-background"
                  key={_id}
                  product={{
                    id: _id,
                    compare_price: compare_price,
                    photo: media?.[0]?.url!,
                    price: price,
                    title: title,
                  }}
                />
              );
            })}
          </div>
        ) : (
          <Empty />
        )}
      </Container>
    </>
  );
}
