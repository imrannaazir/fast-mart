"use client";

import { updateCart } from "@/actions/cart";
import { generateCartState } from "@/libs/generate-cart-state";
import { getErrorMessage } from "@repo/utils/functions";
/* 
1. create a context for cart list  
2. export cart context provider 
3. export hooks for cart list where return that context
*/

import { CartActionType, TCartStateItem } from "@repo/utils/types";
import { message } from "antd";
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
      isLoading: boolean;
      type?: CartActionType;
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
  const [type, setType] = useState<CartActionType | undefined>(undefined);

  // update cart list
  const updateCartList = async (payload: TContextPayload) => {
    if (isLoading) return;
    // update optimistically
    setType("add");
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
        const response = await updateCart(payload.productId, payload.options, payload.type);
        if (!response.success) {
          throw new Error(response.message);
        } else {
          const updatedCartState = generateCartState(response?.data!);
          setCartList(updatedCartState);
          setPrevCartList([]);
          message.success(response.message);
          setType(undefined);
        }
      } catch (error) {
        setCartList(prevCartList);
        setPrevCartList([]);
        message.error(getErrorMessage(error));
        setType(undefined);
      }
    });
  };

  return (
    <CartListContext.Provider value={{ cartList, updateCartList, isLoading, type }}>
      {children}
    </CartListContext.Provider>
  );
};

// context hook
export const useCartList = () => {
  const context = useContext(CartListContext);
  if (!context) throw new Error("useCartListContext must be used in CartListContextProvider");
  return context;
};
