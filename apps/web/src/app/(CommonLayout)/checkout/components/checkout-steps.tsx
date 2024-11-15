"use client";
import { TAddress } from "@repo/utils/types";
import { Steps } from "antd";

import { useOrderContext } from "@/contexts/order-context";
import DeliveryOptionDescription from "./delivery-option-description";
import PaymentOptionDescription from "./payment-option-description";
import ShippingAddressDescription from "./shipping-address-descripton";

const CheckoutSteps = ({ addresses }: { addresses: TAddress[] }) => {
  const { defaultAddress } = useOrderContext();

  return (
    <>
      <Steps
        direction="vertical"
        items={[
          {
            title: "Shipping Address",
            status: !!defaultAddress ? "finish" : "process",
            description: <ShippingAddressDescription addresses={addresses} />,
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
