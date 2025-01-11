"use client";
import assets from "@/assets";
import { light_colors } from "@/constants/colors.constant";
import { TOrder, TOrderItem } from "@repo/utils/types";
import { Card, message, Tag } from "antd";
import { Box } from "lucide-react";
import Image from "next/image";
import { FC } from "react";

type TOrderCardProps = {
  order: TOrder;
};

const OrderCard: FC<TOrderCardProps> = ({ order }) => {
  const handleCopyOrderId = () => {
    window.navigator.clipboard.writeText(order._id!);
    message.success("Order id copied!");
  };
  return (
    <Card bordered={false}>
      {/* top */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Box className="bg-primary/10 text-primary rounded-full p-2" size={38} />

          <div>
            <h2 className="text-lg font-medium capitalize">{order?.status?.toLowerCase()}</h2>
            <Tag
              color={order?.status === "DELIVERED" ? light_colors?.primary : light_colors?.secondary}
              className="font-semibold"
            >
              {order?.status === "DELIVERED" ? "Success" : "Pending"}
            </Tag>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div>
            <h3>Order Id:</h3>
            <Tag onClick={handleCopyOrderId} className="cursor-pointer" color="green">{`#${order?._id}`}</Tag>
          </div>
        </div>
      </div>

      {order?.orderItems?.map((item) => {
        return <OrderItem orderItem={item} key={item?._id} />;
      })}
    </Card>
  );
};

export default OrderCard;

const OrderItem = ({ orderItem }: { orderItem: TOrderItem }) => {
  return (
    <Card className="mt-6 bg-gray-100">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <Image
          className="size-[180px] rounded-md border object-cover shadow-sm"
          src={orderItem?.product?.media?.[0]?.url || assets?.images?.blank_image}
          width={180}
          height={180}
          alt="product"
        />

        {/* product description  */}

        <div>
          <h3 className="text-lg font-semibold">{orderItem?.product?.title}</h3>
          <p
            className="bg-background rounded-md p-4"
            dangerouslySetInnerHTML={{
              __html: orderItem?.product?.description! || "",
            }}
          />
          <div className="mt-4 space-y-1">
            <p>
              Price: <span className="font-semibold">${orderItem?.price}</span>
            </p>
            <p>
              Quantity: <span className="font-semibold">{orderItem?.quantity}</span>
            </p>
            <p>{orderItem?.options?.map((item) => <Tag key={item?._id}>{item?.option_name}</Tag>)}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
