import { WishlistProvider as WishlistContextProvider } from "@/contexts/wishlist-context";
import { getWishListedProductIds } from "@/libs/getWishListedProductIds";
import { ReactNode } from "react";

const WishlistProvider = async ({ children }: { children: ReactNode }) => {
  const wishlist = await getWishListedProductIds();
  return <WishlistContextProvider initialWishlist={wishlist}>{children}</WishlistContextProvider>;
};

export default WishlistProvider;
