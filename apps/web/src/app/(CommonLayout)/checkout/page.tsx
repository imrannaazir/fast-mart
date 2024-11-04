import AppBreadcrumb, { TAppBreadcrumbItem } from "@/components/ui/AppBreadcrumb";
import Container from "@/components/ui/Container";
import CheckoutSteps from "./components/checkout-steps";
import { getAllMyAddresses } from "@/actions/address";
import OrderSummery from "./components/order-summery";

export default async function CheckoutPage() {
  const checkoutBreadcrumbItems: TAppBreadcrumbItem[] = [
    {
      title: "Checkout",
      href: "/checkout",
    },
  ];

  const myAddresses = await getAllMyAddresses();

  return (
    <>
      <AppBreadcrumb title="Checkout" items={checkoutBreadcrumbItems} />
      <Container className="mb-6 grid grid-cols-4 gap-4">
        <div className="col-span-3">
          <CheckoutSteps addresses={myAddresses.data!} />
        </div>
        <OrderSummery />
      </Container>
    </>
  );
}
