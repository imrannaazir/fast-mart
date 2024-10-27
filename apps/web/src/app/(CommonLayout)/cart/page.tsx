"use client";

import AppBreadcrumb, { TAppBreadcrumbItem } from "@/components/ui/AppBreadcrumb";
import Container from "@/components/ui/Container";
import { useCartList } from "@/contexts/cartlist-context";
import { CartActionType, TCartStateItem } from "@repo/utils/types";
import { Button, Card, Empty, Tag } from "antd";
import Image from "next/image";
import { BiTrash, BiX } from "react-icons/bi";
import { BiPlus, BiMinus } from "react-icons/bi";

const CartPage = () => {
  const { cartList } = useCartList();
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
              Cart <span>({cartList.length} items)</span>
            </h2>
          }
          extra={
            <Button type="text" danger icon={<BiX size={16} />} size="small">
              Clear
            </Button>
          }
        >
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          {/* items  */}
          <div className="space-y-3">
            {cartList.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </div>
        </Card>
        {/* right side */}
        <section>right</section>
      </Container>
    </>
  );
};

export default CartPage;

const CartItem = ({ item }: { item: TCartStateItem }) => {
  const { productImg, productTitle, productId, productPrice, quantity } = item;
  const { isInCart, isLoading, type, updateCartList } = useCartList();

  // handle  add to cart
  const handleCart = (type: CartActionType) => {
    updateCartList({
      options: [],
      productId,
      productImg: productImg!,
      productPrice,
      productTitle,
      type: type,
    });
  };
  return (
    <div className="grid grid-cols-3 items-center justify-between rounded-lg border p-2 pr-6">
      <div className="col-span-2 flex items-center gap-4">
        <Image
          height={80}
          width={80}
          alt={productTitle!}
          src={productImg!}
          className="size-[80px] rounded-lg object-cover object-center"
        />

        {/* title and variants */}
        <div>
          <h2 className="text-base font-semibold">{productTitle}</h2>
          <span>
            {["White", "XL"].map((variant) => (
              <Tag className="text-xs">{variant}</Tag>
            ))}
          </span>
        </div>
      </div>

      {/* actions button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between rounded-md p-1">
          <Button
            onClick={() => handleCart("decrement")}
            loading={isLoading && type === "decrement"}
            disabled={!isInCart(productId!)}
            type="dashed"
            icon={<BiMinus size={14} />}
            size={"middle"}
          />
          <p className="px-3 text-sm">{quantity}</p>
          <Button
            onClick={() => handleCart("add")}
            loading={isLoading && type === "add"}
            type="dashed"
            icon={<BiPlus size={14} />}
            size={"middle"}
          />
        </div>
        {/* price  */}
        <h3 className="text-lg font-semibold">${productPrice}</h3>
        {/* delete button */}
        <Button type="default" size="middle" danger icon={<BiTrash />} />
      </div>
    </div>
  );
};
