"use client";
import { TAddress } from "@repo/utils/types";
import { Steps } from "antd";
import { useEffect } from "react";

import { useOrderContext } from "@/contexts/order-context";
import DeliveryOptionDescription from "./delivery-option-description";
import PaymentOptionDescription from "./payment-option-description";
import ShippingAddressDescription from "./shipping-address-descripton";

const CheckoutSteps = ({ addresses }: { addresses: TAddress[] }) => {
  const { defaultAddress, setDefaultAddress } = useOrderContext();

  useEffect(() => {
    setDefaultAddress(addresses.find((address) => !!address.default)?._id || "");
  }, [addresses]);

  return (
    <>
      <Steps
        direction="vertical"
        items={[
          {
            title: "Shipping Address",
            status: !!defaultAddress ? "finish" : "process",
            description: <ShippingAddressDescription addresses={addresses} defaultAddress={defaultAddress} />,
          },
          {
            title: "Delivery Option",
            status: "finish",
            description: <DeliveryOptionDescription />,
          },
          {
            title: "Payment method",
            status: "finish",
            description: <PaymentOptionDescription />,
          },
        ]}
      />
    </>
  );
};

export default CheckoutSteps;
