"use client";
import { useCartList } from "@/contexts/cartlist-context";
import { Button, Card, Divider, Form, Input, message, Space } from "antd";
import Link from "next/link";

const CartSummery = () => {
  const { subTotalPrice } = useCartList();
  const shippingFee = subTotalPrice ? 10 : 0;
  const discount = 0;
  const totalPrice = subTotalPrice + shippingFee - discount;
  const onFinish = (_values: FormData) => {
    message.info("Your provided code is not valid.");
  };

  return (
    <Card className="max-h-[319px] bg-gray-100">
      {/* promo code  */}
      <h3 className="mb-2 text-lg font-semibold">Promo Code</h3>

      <Form initialValues={{ code: "" }} style={{ maxWidth: 360 }} onFinish={onFinish}>
        <Space.Compact size="middle">
          <Form.Item name="code" rules={[{ required: true, message: "Promo code is required" }]}>
            <Input placeholder="Type here." />
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit" className="w-full">
              Apply
            </Button>
          </Form.Item>
        </Space.Compact>
      </Form>

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
      <Link href={"/checkout"}>
        <Button block size="large" type="primary" className="mt-4">
          Checkout
        </Button>
      </Link>
    </Card>
  );
};

export default CartSummery;
