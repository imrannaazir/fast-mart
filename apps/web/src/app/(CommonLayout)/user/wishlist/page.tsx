import { getAllMyWishlistItems } from "@/actions/wishlist";
import AppProductCard from "@/components/ui/ProductCard/AppProductCard";

import { TWishlistItemProduct } from "@repo/utils/types";
import HomeSectionTop from "../../components/HomeSectionTop";

const WishlistPage = async () => {
  const wishlist = await getAllMyWishlistItems();

  return (
    <div>
      <HomeSectionTop
        heading="My Wishlist History
"
      />
      {wishlist?.length ? (
        <div className="grid grid-cols-4 gap-4 space-x-4">
          {wishlist.map((item) => (
            <AppProductCard
              className="bg-background"
              key={item._id}
              product={{
                id: (item.productId as TWishlistItemProduct)._id,
                compare_price: (item.productId as TWishlistItemProduct).compare_price,
                photo: (item.productId as TWishlistItemProduct)?.media?.[0]?.url!,
                price: (item.productId as TWishlistItemProduct).price,
                title: (item.productId as TWishlistItemProduct).title,
              }}
            />
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default WishlistPage;
