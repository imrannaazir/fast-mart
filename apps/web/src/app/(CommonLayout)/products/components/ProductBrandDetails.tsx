import assets from "@/assets";
import { cn } from "@/libs/utils";
import { Rate } from "antd";
import { ClassValue } from "clsx";
import Image from "next/image";

type TProductBrandDetailsProps = {
  img: string;
  name: string;
  description: string;
  className?: ClassValue;
};

const ProductBrandDetails: React.FC<TProductBrandDetailsProps> = ({
  img = assets?.images?.blank_image,
  name,
  description,
  className,
}) => {
  const markupDescription = { __html: description || "" };
  return (
    <div className={cn("space-y-6 rounded-md bg-gray-100 p-6", className)}>
      <div className="bg-background rounded-md p-4">
        <Image width={100} height={50} src={img} alt={name} className="aspect-[2/1] object-cover" />
        <div>
          <h2 className="text-[calc(15px + 1*(100vw - 320px) / 1600)] mt-2">{name}</h2>
          <div>
            {" "}
            <Rate className=" " disabled allowHalf value={2.5} style={{ fontSize: 14 }} />
            <span className="ml-2 text-xs">(36 Reviews)</span>
          </div>
        </div>
      </div>
      <div className="text-gray-700" dangerouslySetInnerHTML={markupDescription} />{" "}
    </div>
  );
};

export default ProductBrandDetails;
