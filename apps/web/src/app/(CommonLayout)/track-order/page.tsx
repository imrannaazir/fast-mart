"use client";
import { getSingleOrder } from "@/actions/order";
import AppBreadcrumb, { TAppBreadcrumbItem } from "@/components/ui/AppBreadcrumb";
import Container from "@/components/ui/Container";
import { getErrorMessage } from "@repo/utils/functions";
import { TOrder } from "@repo/utils/types";
import { message } from "antd";
import { useState } from "react";
import OrderDetails from "./components/order-details";
import OrderSearch from "./components/order-search";
import OrderStatus from "./components/order-status";

const TrackOrder = () => {
  const trackOrderBreadcrumbItems: TAppBreadcrumbItem[] = [
    {
      title: "Track Order",
      href: "/track-order",
    },
  ];

  const [orderData, setOrderData] = useState<TOrder | null>(null);
  const [loading, setLoading] = useState(false);
  const handleSearch = async (orderId: string) => {
    setLoading(true);
    const result = await getSingleOrder(orderId);
    if (result?.success) {
      setOrderData(result?.data);
    } else {
      message?.error(getErrorMessage(result));
      setOrderData(null);
    }

    setLoading(false);
  };

  return (
    <>
      <AppBreadcrumb className="" items={trackOrderBreadcrumbItems} title="Track Order" />
      <div className="flex items-center justify-center rounded-xl bg-gradient-to-b from-blue-50 to-white p-8 shadow-lg">
        <Container className="w-full">
          <div className="w-full">
            {/* Header */}
            <OrderSearch isLoading={loading} onSearch={handleSearch} />

            <div className="w-full">
              {/* Order Status */}
              {orderData && (
                <div className="w-full *:w-full">
                  <OrderStatus order={orderData} />
                  <OrderDetails />
                </div>
              )}

              {/* Map */}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default TrackOrder;
