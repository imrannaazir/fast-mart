"use client";

import { clearCartList, updateCart } from "@/actions/cart";
import { generateCartState } from "@/libs/generate-cart-state";
import { message } from "antd";
import { createContext, ReactNode, useCallback, useContext, useState, useTransition } from "react";
import { getErrorMessage } from "@repo/utils/functions";
import { CartActionType, TCartStateItem } from "@repo/utils/types";

type TContextPayload = {
  productId: string;
  productImg: string;
  productTitle: string;
  productPrice: number;
  options: string[];
  type: CartActionType;
};

type TCartListContext = {
  cartList: TCartStateItem[];
  isLoading: boolean;
  totalItems: number;
  subTotalPrice: number;
  type?: CartActionType;
  updateCartList: (payload: TContextPayload) => Promise<void>;
  clearCart: () => Promise<void>;
  isInCart: (productId: string) => boolean;
};

const CartListContext = createContext<TCartListContext | undefined>(undefined);

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
  const updateCartList = useCallback(async (payload: TContextPayload) => {
    if (isLoading) return;

    // update optimistically
    setPrevCartList(cartList);

    const cartListIds = cartList.map((item) => item.productId);
    const optimisticallyUpdatedCartList = cartList.map((item) => {
      if (!cartListIds.includes(item.productId)) {
        console.log("");
      }
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
  }, []);

  // clear cart list
  const clearCart = async () => {
    if (isLoading) {
      return;
    }

    const previousState = [...cartList];
    setCartList([]);

    startTransition(async () => {
      try {
        const response = await clearCartList();
        if (!response.success) {
          throw new Error(response.message);
        }
        setCartList([]);
        message.success(response.message);
      } catch (error) {
        setCartList(previousState);
        message.error(getErrorMessage(error));
      }
    });
  };

  // check is in the cart
  const isInCart = (productId: string) => {
    return cartList.some((item) => item.productId === productId);
  };

  // total items in the cart list
  const totalItems = cartList.reduce((acc, currentValue) => {
    return acc + currentValue.quantity;
  }, 0);

  // calculate total price
  const subTotalPrice = cartList.reduce((acc, currentValue) => {
    const currentProductPrice = currentValue.quantity * currentValue.productPrice;
    return acc + currentProductPrice;
  }, 0);

  return (
    <CartListContext.Provider
      value={{
        cartList,
        updateCartList,
        clearCart,
        isLoading,
        type,
        isInCart,
        totalItems,
        subTotalPrice,
      }}
    >
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
