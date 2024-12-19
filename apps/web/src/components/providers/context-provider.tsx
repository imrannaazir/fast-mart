import { getMyCartList } from "@/actions/cart";
import { getMyData } from "@/actions/user";
import { getAllMyWishlistItems } from "@/actions/wishlist";
import { CartListContextProvider } from "@/contexts/cartlist-context";
import { OrderContextProvider } from "@/contexts/order-context";
import { UserProvider as UserContextProvider } from "@/contexts/user-context";
import { WishlistProvider as WishlistContextProvider } from "@/contexts/wishlist-context";
import { generateCartState } from "@/libs/generate-cart-state";
import { TCartStateItem } from "@repo/utils/types";
import { ReactNode } from "react";

const ContextProvider = async ({ children }: { children: ReactNode }) => {
  const [wishlist, cartList, user] = await Promise.all([getAllMyWishlistItems(), getMyCartList(), getMyData()]);
  const cartListState: TCartStateItem[] = generateCartState(cartList!);

  return (
    <WishlistContextProvider initialWishlist={wishlist!}>
      <CartListContextProvider initialCartList={cartListState}>
        <OrderContextProvider>
          <UserContextProvider initialUser={user}>{children}</UserContextProvider>
        </OrderContextProvider>
      </CartListContextProvider>
    </WishlistContextProvider>
  );
};

export default ContextProvider;
