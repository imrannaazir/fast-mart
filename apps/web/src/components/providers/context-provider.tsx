import { getMyCartList } from "@/actions/cart";
import { CartListContextProvider } from "@/contexts/cartlist-context";
import { OrderContextProvider } from "@/contexts/order-context";
import { WishlistProvider as WishlistContextProvider } from "@/contexts/wishlist-context";
import { generateCartState } from "@/libs/generate-cart-state";
import { getWishListedProductIds } from "@/libs/getWishListedProductIds";
import { TCartStateItem } from "@repo/utils/types";
import { ReactNode } from "react";

const ContextProvider = async ({ children }: { children: ReactNode }) => {
  const [wishlist, cartList] = await Promise.all([getWishListedProductIds(), getMyCartList()]);
  const cartListState: TCartStateItem[] = generateCartState(cartList!);

  return (
    <WishlistContextProvider initialWishlist={wishlist}>
      <CartListContextProvider initialCartList={cartListState}>
        <OrderContextProvider>{children}</OrderContextProvider>
      </CartListContextProvider>
    </WishlistContextProvider>
  );
};

export default ContextProvider;
