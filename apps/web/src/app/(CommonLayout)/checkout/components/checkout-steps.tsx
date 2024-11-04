"use client";
import { Steps } from "antd";
import { useEffect, useState } from "react";
import { TAddress } from "@repo/utils/types";

import ShippingAddressDescription from "./shipping-address-descripton";
import DeliveryOptionDescription from "./delivery-option-description";
import PaymentOptionDescription from "./payment-option-description";

const CheckoutSteps = ({ addresses }: { addresses: TAddress[] }) => {
  const [defaultAddress, setDefaultAddress] = useState("");

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
