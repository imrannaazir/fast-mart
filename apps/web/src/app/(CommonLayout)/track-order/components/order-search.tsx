"use client";

import { Button, Form, Input } from "antd";
import { Package, Search } from "lucide-react";
import { FC } from "react";

interface OrderSearchProps {
  onSearch: (orderId: string) => void;
  isLoading: boolean;
}

const OrderSearch: FC<OrderSearchProps> = ({ onSearch, isLoading }) => {
  const [form] = Form.useForm();

  const handleSubmit = ({ orderId }: { orderId: string }) => {
    onSearch(orderId.trim());
  };

  return (
    <div className="mb-12 text-center">
      <div className="mb-4 flex justify-center">
        <Package className="h-12 w-12 text-teal-600" />
      </div>
      <h1 className="mb-6 text-3xl font-bold">Track Your Order</h1>

      <Form form={form} onFinish={handleSubmit} className="mx-auto max-w-md">
        <Form.Item
          name="orderId"
          rules={[
            {
              required: true,
              message: "Please enter your order ID",
            },
          ]}
        >
          <Input
            placeholder="Enter your order ID (e.g., FKT89562)"
            suffix={
              <Button loading={isLoading} htmlType="submit" type="primary" icon={<Search className="h-5 w-5" />} />
            }
            className="rounded-lg py-2 pl-4 pr-2"
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default OrderSearch;
