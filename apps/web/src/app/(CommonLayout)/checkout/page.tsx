import { getAllMyAddresses } from "@/actions/address";
import AppBreadcrumb, { TAppBreadcrumbItem } from "@/components/ui/AppBreadcrumb";
import Container from "@/components/ui/Container";
import CheckoutSteps from "./components/checkout-steps";
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
      <Container className="mb-6 flex flex-col gap-4 md:flex-row">
        <div className="flex-grow">
          <CheckoutSteps addresses={myAddresses.data!} />
        </div>
        <OrderSummery className="sticky top-4 min-w-[320px]" />
      </Container>
    </>
  );
}
