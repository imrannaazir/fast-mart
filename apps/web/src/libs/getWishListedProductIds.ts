import { getAllMyWishlistItems } from "@/actions/wishlist";

export const getWishListedProductIds = async () => {
  const wishlistItems = await getAllMyWishlistItems();
  return wishlistItems?.map((item) => item?.productId) || [];
};
