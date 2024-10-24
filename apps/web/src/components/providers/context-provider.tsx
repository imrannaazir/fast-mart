import { getMyCartList } from "@/actions/cart";
import { CartListContextProvider } from "@/contexts/cartlist-context";
import { WishlistProvider as WishlistContextProvider } from "@/contexts/wishlist-context";
import { generateCartState } from "@/libs/generate-cart-state";
import { getWishListedProductIds } from "@/libs/getWishListedProductIds";
import { TCartStateItem } from "@repo/utils/types";
import { ReactNode } from "react";

const ContextProvider = async ({ children }: { children: ReactNode }) => {
  const wishlist = await getWishListedProductIds();
  const cartList = await getMyCartList();
  const cartListState: TCartStateItem[] = generateCartState(cartList!);

  return (
    <WishlistContextProvider initialWishlist={wishlist}>
      <CartListContextProvider initialCartList={cartListState}>{children}</CartListContextProvider>
    </WishlistContextProvider>
  );
};

export default ContextProvider;
