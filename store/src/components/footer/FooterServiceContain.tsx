import assets from "@/assets";
import { cn } from "@/libs/utils";
import { Divider } from "antd";
import Image from "next/image";

const FooterServiceContain = () => {
  const serviceContainContent = [
    {
      id: 1,
      label: "Every Fresh Products",
      icon: assets.svg.products,
    },
    {
      id: 2,
      label: "Free Delivery For Order Over $50",
      icon: assets.svg.truck,
    },
    {
      id: 3,
      label: "Daily Mega Discounts",
      icon: assets.svg.discounts,
    },
    {
      id: 4,
      label: "Best Price On The Market",
      icon: assets.svg.best_price,
    },
  ];
  return (
    <div className="flex flex-col lg:flex-row  justify-between items-center py-10  ">
      {serviceContainContent.map((item, i) => {
        return (
          <>
            <div
              className="flex flex-col lg:flex-row  items-center lg:gap-4  "
              key={item.id}
            >
              <Image src={item.icon} height={38} width={38} alt={item.label} />
              <p className="font-medium">{item.label}</p>
            </div>
            <Divider className="lg:hidden" />
            <Divider
              className={cn(
                serviceContainContent.length <= i + 1
                  ? "hidden"
                  : "hidden lg:block "
              )}
              type="vertical"
              dashed
              style={{
                height: "20px",
                borderLeft: "1.7px dashed gray",
              }}
            />
          </>
        );
      })}
    </div>
  );
};

export default FooterServiceContain;
