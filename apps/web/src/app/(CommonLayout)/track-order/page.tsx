import AppBreadcrumb, { TAppBreadcrumbItem } from "@/components/ui/AppBreadcrumb";
import Container from "@/components/ui/Container";
import { Package } from "lucide-react";
import OrderDetails from "./components/order-details";
import OrderStatus from "./components/order-status";

const TrackOrder = () => {
  const trackOrderBreadcrumbItems: TAppBreadcrumbItem[] = [
    {
      title: "Track Order",
      href: "/track-order",
    },
  ];

  return (
    <>
      <AppBreadcrumb className="" items={trackOrderBreadcrumbItems} title="Track Order" />
      <div className="flex items-center justify-center rounded-xl bg-gradient-to-b from-blue-50 to-white p-8 shadow-lg">
        <Container className="w-full">
          <div className="w-full">
            {/* Header */}
            <div className="mb-8 text-center">
              <div className="mb-4 flex justify-center">
                <Package className="h-12 w-12" />
              </div>
              <h1 className="mb-2 text-3xl font-bold text-gray-900">Track Your Order</h1>
              <p className="text-gray-600">Order ID: #FKT89562</p>
            </div>

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
