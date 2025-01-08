"use client";
import { TAddress } from "@repo/utils/types";
import { Steps, StepsProps } from "antd";

import { useOrderContext } from "@/contexts/order-context";
import { MapPin } from "lucide-react";
import DeliveryOptionDescription from "./delivery-option-description";
import PaymentOptionDescription from "./payment-option-description";
import ShippingAddressDescription from "./shipping-address-descripton";

const CheckoutSteps = ({ addresses }: { addresses: TAddress[] }) => {
  const { defaultAddress } = useOrderContext();
  const items: StepsProps["items"] = [
    {
      title: "Shipping Address",
      status: !defaultAddress ? "process" : "finish",
      description: <ShippingAddressDescription addresses={addresses} />,
      icon: (
        <div className="bg-primary flex aspect-square items-center justify-center rounded-full">
          <MapPin size={14} />
        </div>
      ),
    },
  ];

  if (defaultAddress) {
    items.push({
      title: "Delivery Option",
      status: !defaultAddress ? "wait" : "finish",
      description: <DeliveryOptionDescription />,
    });
    items.push({
      title: "Payment method",
      status: !defaultAddress ? "wait" : "process",
      description: <PaymentOptionDescription />,
    });
  }

  return (
    <>
      <Steps direction="vertical" items={items} />
    </>
  );
};

export default CheckoutSteps;
