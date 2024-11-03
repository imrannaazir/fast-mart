"use client";
import AppBreadcrumb, { TAppBreadcrumbItem } from "@/components/ui/AppBreadcrumb";
import Container from "@/components/ui/Container";
import { Button, Card, Radio, RadioChangeEvent, Steps } from "antd";
import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import AddAddressForm from "./components/add-address-form";
import { TAddress } from "@repo/utils/types";
import { getAllMyAddresses } from "@/actions/address";

export default function CheckoutPage() {
  const checkoutBreadcrumbItems: TAppBreadcrumbItem[] = [
    {
      title: "Checkout",
      href: "/checkout",
    },
  ];

  const [value, setValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addresses, setAddresses] = useState<TAddress[]>([]);

  useEffect(() => {
    (async () => {
      const myAddresses = (await getAllMyAddresses()).data || [];
      setAddresses(myAddresses);
    })();
  }, []);

  useEffect(() => {
    setValue(addresses.find((address) => !!address.default)?._id || "");
  }, [addresses]);

  const description = "This is a description.";
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
                    {addresses.length && (
                      <Radio.Group className="grid w-full grid-cols-2 gap-6" onChange={onChange} value={value}>
                        {addresses.map((address) => (
                          <Card>
                            <Radio value={address._id}>{`${address.fullAddress}`}</Radio>
                          </Card>
                        ))}
                      </Radio.Group>
                    )}
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
