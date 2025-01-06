"use client";
import { TPaymentType } from "@repo/utils/types";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

type TOrderContext = {
  defaultAddress: string;
  setDefaultAddress: Dispatch<SetStateAction<string>>;
  paymentType: TPaymentType;
  setPaymentType: Dispatch<SetStateAction<TPaymentType>>;
};

const OrderContext = createContext<TOrderContext | undefined>(undefined);

export const OrderContextProvider = ({ children }: { children: ReactNode }) => {
  const [defaultAddress, setDefaultAddress] = useState("");
  const [paymentType, setPaymentType] = useState<TPaymentType>("CARD");
  return (
    <OrderContext.Provider
      value={{
        paymentType,
        setPaymentType,
        defaultAddress,
        setDefaultAddress,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

// context hook
export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrderContext must be used in OrderContextProvider");
  return context;
};
