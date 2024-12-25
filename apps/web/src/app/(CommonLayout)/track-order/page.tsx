"use client";
import AppBreadcrumb, { TAppBreadcrumbItem } from "@/components/ui/AppBreadcrumb";
import Container from "@/components/ui/Container";
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

  const [orderData, setOrderData] = useState<{ orderId: string } | null>(null);

  const handleSearch = (orderId: string) => {
    // In a real app, you would fetch order data here
    setOrderData({ orderId });
  };

  return (
    <>
      <AppBreadcrumb className="" items={trackOrderBreadcrumbItems} title="Track Order" />
      <div className="flex items-center justify-center rounded-xl bg-gradient-to-b from-blue-50 to-white p-8 shadow-lg">
        <Container className="w-full">
          <div className="w-full">
            {/* Header */}
            <OrderSearch onSearch={handleSearch} />

            <div className="w-full">
              {/* Order Status */}
              <div className="w-full *:w-full">
                <OrderStatus />
                <OrderDetails />
              </div>

              {/* Map */}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default TrackOrder;
