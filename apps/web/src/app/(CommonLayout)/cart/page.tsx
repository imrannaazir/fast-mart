"use client";

import AppBreadcrumb, { TAppBreadcrumbItem } from "@/components/ui/AppBreadcrumb";
import Container from "@/components/ui/Container";
import { useCartList } from "@/contexts/cartlist-context";
import { Button, Card, Empty } from "antd";
import CartItem from "./components/cart-items";
import { BiX } from "react-icons/bi";
import CartSummery from "./components/cart-summery";

const CartPage = () => {
  const { cartList, totalItems, clearCart, isLoading } = useCartList();
  const cartBreadcrumbItems: TAppBreadcrumbItem[] = [
    {
      title: "Cart",
      href: "/cart",
    },
  ];
  return (
    <>
      <AppBreadcrumb items={cartBreadcrumbItems} title="Cart" />
      <Container className="mb-6 grid grid-cols-4 gap-6">
        {/* main */}
        <Card
          className="col-span-3"
          title={
            <h2>
              Cart <span>({totalItems} items)</span>
            </h2>
          }
          extra={
            <Button
              disabled={!cartList.length || isLoading}
              onClick={clearCart}
              type="text"
              danger
              icon={<BiX size={16} />}
              size="small"
            >
              Clear
            </Button>
          }
        >
          {!cartList.length && (
            <div className="flex items-center justify-center">
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
          )}
          {/* items  */}
          <div className="space-y-3">
            {cartList.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </div>
        </Card>
        {/* right side */}

        <CartSummery />
      </Container>
    </>
  );
};

export default CartPage;
