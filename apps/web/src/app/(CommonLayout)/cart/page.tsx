import AppBreadcrumb, { TAppBreadcrumbItem } from "@/components/ui/AppBreadcrumb";
import Container from "@/components/ui/Container";
import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";

const CartPage = async () => {
  const session = await getServerSession(authOptions);
  console.log({ session }, "blah - 7");

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
