"use client";
import AppBreadcrumb, { TAppBreadcrumbItem } from "@/components/ui/AppBreadcrumb";
import Container from "@/components/ui/Container";
import { Button, Card, Radio, RadioChangeEvent, Steps } from "antd";
import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import AddAddressForm from "./components/add-address-form";

export default function CheckoutPage() {
  const checkoutBreadcrumbItems: TAppBreadcrumbItem[] = [
    {
      title: "Checkout",
      href: "/checkout",
    },
  ];

  const description = "This is a description.";

  const [value, setValue] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <AppBreadcrumb title="Checkout" items={checkoutBreadcrumbItems} />
      <Container className="mb-6 grid grid-cols-4 gap-4">
        <div className="col-span-3">
          <Steps
            direction="vertical"
            current={2}
            items={[
              {
                title: "Shipping Address",
                status: "finish",
                description: (
                  <Card
                    className="bg-gray-100"
                    extra={
                      <Button type="primary" icon={<BiPlus />} onClick={showModal}>
                        Add new
                      </Button>
                    }
                  >
                    <Radio.Group className="grid w-full grid-cols-2 gap-6" onChange={onChange} value={value}>
                      {Array.from({ length: 3 }).map((_item, i) => (
                        <Card>
                          <Radio value={i}>{`${i}`}</Radio>
                        </Card>
                      ))}
                    </Radio.Group>
                  </Card>
                ),
              },
              {
                title: "Delivery Option",
                description,
              },
              {
                title: "Payment method",
                description,
              },
            ]}
          />
        </div>
        <div className="">hello</div>
      </Container>

      <AddAddressForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
}
