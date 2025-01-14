"use client";
import { placeOrder } from "@/actions/order";
import { useCartList } from "@/contexts/cartlist-context";
import { useOrderContext } from "@/contexts/order-context";
import { cn } from "@/libs/utils";
import { getErrorMessage } from "@repo/utils/functions";
import { TCartStateItem } from "@repo/utils/types";
import { Button, Card, Divider, Empty, message } from "antd";
import { ClassValue } from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const OrderSummery = ({ className }: { className?: ClassValue }) => {
  const { defaultAddress, paymentType } = useOrderContext();
  const { subTotalPrice, cartList, totalPrice, discount, shippingFee } = useCartList();

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const orderPayload = {
    cartItemIds: cartList.map((item) => item._id),
    addressId: defaultAddress,
    paymentType,
  };

  const handlePlaceOrder = async () => {
    setIsLoading(true);
    try {
      await placeOrder(orderPayload);

      setIsLoading(false);

      router.push("/order-success");
    } catch (error) {
      message.error(getErrorMessage(error));
      setIsLoading(false);
    }
  };
  return (
    <Card className={cn("mt-8 h-fit bg-gray-100", className)}>
      {/* promo code  */}
      <h3 className="mb-2 text-lg font-semibold">Order Summery</h3>
      <div>
        <div className="mb-2 space-y-2">
          {!!cartList.length && cartList?.map((item) => <CartItem key={item._id} cartItem={item} />)}
        </div>
        {!cartList.length && <Empty className="min-w-[288px]" image={Empty.PRESENTED_IMAGE_SIMPLE} />}
      </div>
      <Divider
        className="border-gray-400"
        style={{
          marginTop: 0,
        }}
      />

      <div>
        <p className="flex items-center justify-between text-base font-normal text-gray-500">
          <span>Subtotal</span>
          <span>${subTotalPrice}</span>
        </p>
        <p className="flex items-center justify-between text-base font-normal text-gray-500">
          <span>Shipping fee</span>
          <span>${shippingFee}</span>
        </p>
        <p className="flex items-center justify-between text-base font-normal text-gray-500">
          <span>Discount</span>
          <span> -${discount}</span>
        </p>
        <p className="flex items-center justify-between text-base font-medium">
          <span>Total</span>
          <span>${totalPrice}</span>
        </p>
      </div>
      {paymentType === "COD" && (
        <Button block size="large" type="primary" className="mt-4" onClick={handlePlaceOrder} loading={isLoading}>
          Place Order
        </Button>
      )}
    </Card>
  );
};

export default OrderSummery;

const CartItem = ({ cartItem }: { cartItem: TCartStateItem }) => {
  const { productTitle, productImg, quantity, productPrice } = cartItem;

  return (
    <div className="flex items-center gap-3">
      {/* image and title */}
      <Image className="size-10 object-cover" src={productImg!} width={87} height={72} alt="product" />
      <div className="flex w-full items-center justify-between gap-2">
        <h3 className="text-primary w-[100px] overflow-hidden text-ellipsis whitespace-nowrap text-[16.5px] font-medium">
          {productTitle}
        </h3>
        <div className="flex gap-1 text-gray-700">
          <p className="">{quantity} x</p>
          <p className="font-medium">${productPrice}</p>
        </div>
      </div>
    </div>
  );
};
