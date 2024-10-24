"use client";

import { updateCart } from "@/actions/cart";
import { generateCartState } from "@/libs/generate-cart-state";
/* 
1. create a context for cart list  
2. export cart context provider 
3. export hooks for cart list where return that context
*/

import { CartActionType, TCartStateItem } from "@repo/utils/types";
import { createContext, ReactNode, useContext, useState, useTransition } from "react";

type TContextPayload = {
  productId: string;
  productImg: string;
  productTitle: string;
  productPrice: number;
  options: string[];
  type: CartActionType;
};

type TCartListContext =
  | {
      cartList: TCartStateItem[];
      updateCartList: (payload: TContextPayload) => Promise<void>;
    }
  | undefined;

const CartListContext = createContext<TCartListContext>(undefined);

// context provider
export const CartListContextProvider = ({
  children,
  initialCartList,
}: {
  children: ReactNode;
  initialCartList: TCartStateItem[];
}) => {
  const [cartList, setCartList] = useState<TCartStateItem[]>(initialCartList);
  const [prevCartList, setPrevCartList] = useState<TCartStateItem[]>([]);
  const [isLoading, startTransition] = useTransition();

  // update cart list
  const updateCartList = async (payload: TContextPayload) => {
    if (isLoading) return;
    // update optimistically
    setCartList((prev) => {
      setPrevCartList(prev);
      const currentCartItem = prev?.find((item) => item.productId === payload.productId);
      const randomIdForNewItem = (Math.random() * 1000).toString();
      const updatedCartItem: TCartStateItem = currentCartItem?.productId
        ? currentCartItem
        : {
            _id: randomIdForNewItem,
            productId: payload.productId,
            productPrice: payload.productPrice,
            productTitle: payload.productTitle,
            productImg: payload.productImg,
            options: payload.options,
            quantity: 0,
          };
      updatedCartItem.quantity =
        payload.type === "remove"
          ? 0
          : payload.type === "add"
            ? updatedCartItem.quantity + 1
            : updatedCartItem.quantity - 1;

      const restCartItems = prev.filter((item) => item.productId !== payload.productId);

      return [...restCartItems, ...(updatedCartItem.quantity !== 0 ? [updatedCartItem] : [])];
    });
    startTransition(async () => {
      try {
        const updatedCartList = await updateCart(payload.productId, payload.options, payload.type);
        const updatedCartState = generateCartState(updatedCartList);
        setCartList(updatedCartState);
        setPrevCartList([]);
      } catch (error) {
        setCartList(prevCartList);
        setPrevCartList([]);
      }
    });
  };

  console.log(cartList, "cart context - 87");

  return <CartListContext.Provider value={{ cartList, updateCartList }}>{children}</CartListContext.Provider>;
};

// context hook
export const useCartList = () => {
  const context = useContext(CartListContext);
  if (!context) throw new Error("useCartListContext must be used in CartListContextProvider");
  return context;
};
