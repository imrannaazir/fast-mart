import AppBreadcrumb, { TAppBreadcrumbItem } from "@/components/ui/AppBreadcrumb";
import Container from "@/components/ui/Container";

const CartPage = () => {
  const cartBreadcrumbItems: TAppBreadcrumbItem[] = [
    {
      title: "Cart",
      href: "/cart",
    },
  ];
  return (
    <>
      <AppBreadcrumb items={cartBreadcrumbItems} title="Cart" />
      <Container className="mb-6 grid grid-cols-5 gap-6">
        <p>Cart</p>
      </Container>
    </>
  );
};

export default CartPage;
