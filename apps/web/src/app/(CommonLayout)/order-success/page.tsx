import { Button, Result } from "antd";
import Link from "next/link";
import React from "react";

const App: React.FC = () => (
  <Result
    className="my-12"
    status="success"
    title="Order Placed Successfully!"
    subTitle="Thank you for your purchase. Your order has been received and is being processed."
    extra={[
      <Link href={"/track-order"}>
        <Button type="primary" key="track-order">
          Track Order
        </Button>
      </Link>,
      <Link href={"/"}>
        <Button key="continue-shopping">Continue Shopping</Button>,
      </Link>,
    ]}
  />
);

export default App;
