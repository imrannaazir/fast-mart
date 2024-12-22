import assets from "@/assets";
import { light_colors } from "@/constants/colors.constant";
import { TOrder, TOrderItem } from "@repo/utils/types";
import { Card, Tag } from "antd";
import { Box } from "lucide-react";
import Image from "next/image";
import { FC } from "react";

type TOrderCardProps = {
  order: TOrder;
};

const OrderCard: FC<TOrderCardProps> = ({ order }) => {
  return (
    <Card bordered={false}>
      {/* top */}
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
      <div className="flex items-center gap-4">
        <Image
          className="rounded-ms size-[180px] border object-cover shadow-sm"
          src={orderItem?.product?.media?.[0]?.url || assets?.images?.blank_image}
          width={180}
          height={180}
          alt="product"
        />

        {/* product description  */}

        <div>
          <h3 className="text-lg font-semibold">{orderItem?.product?.title}</h3>
          <p
            className=""
            dangerouslySetInnerHTML={{
              __html: orderItem?.product?.description! || "",
            }}
          ></p>
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
