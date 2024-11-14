import { light_colors } from "@/constants/colors.constant";
import { Card, Tag } from "antd";
import { Box } from "lucide-react";
import Image from "next/image";

const OrderCard = () => {
  return (
    <Card bordered={false}>
      {/* top */}
      <div className="flex items-center gap-4">
        <Box className="bg-primary/10 text-primary rounded-full p-2" size={38} />

        <div>
          <h2 className="text-lg font-medium">Delivered</h2>
          <Tag color={light_colors.primary} className="font-semibold">
            Success
          </Tag>
        </div>
      </div>

      {/* product card  */}
      <Card className="mt-6 bg-gray-100">
        <div className="flex items-center gap-4">
          <Image
            className="size-[180px] object-cover"
            src={"https://themes.pixelstrap.com/fastkart/assets/images/vegetable/product/1.png"}
            width={180}
            height={180}
            alt="product"
          />

          {/* product description  */}

          <div>
            <h3 className="text-lg font-semibold">Fantasy Crunchy Choco Chip Cookies</h3>
            <p className="font-medium text-gray-500">
              Cheddar dolcelatte gouda. Macaroni cheese cheese strings feta halloumi cottage cheese jarlsberg cheese
              triangles say cheese.
            </p>
            <div className="mt-4 space-y-1">
              <p>
                Price: <span className="font-semibold">$20</span>
              </p>
              <p>
                Quantity: <span className="font-semibold">20</span>
              </p>
              <p>
                Size: <Tag>M</Tag>
              </p>
              <p>
                Color: <Tag>Blue</Tag>
              </p>
            </div>
          </div>
        </div>
      </Card>
    </Card>
  );
};

export default OrderCard;
