import { getAllMyWishlistItems } from "@/actions/wishlist";
import AppProductCard from "@/components/ui/ProductCard/AppProductCard";

import { TWishlistItemProduct } from "@repo/utils/types";
import { Empty } from "antd";
import HomeSectionTop from "../../components/HomeSectionTop";

const WishlistPage = async () => {
  const wishlist = await getAllMyWishlistItems();

  return (
    <div className="h-full">
      <HomeSectionTop
        heading="My Wishlist History
"
      />
      {wishlist?.length ? (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
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
    </div>
  );
};

export default WishlistPage;
