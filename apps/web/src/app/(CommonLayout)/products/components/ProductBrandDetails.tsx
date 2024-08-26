import { Rate } from "antd";
import React from "react";

type TProductBrandDetailsProps = {
  img: string;
  name: string;
  description: string;
};

const ProductBrandDetails: React.FC<TProductBrandDetailsProps> = ({ img, name, description }) => {
  return (
    <div className="space-y-6 rounded-md bg-gray-100 p-6">
      <div className="bg-background rounded-md px-6 py-2">
        <img src={img} alt={name} className="w-9" />
        <div>
          <h2 className="text-[calc(15px + 1*(100vw - 320px) / 1600)] mt-2">{name}</h2>
          <div>
            {" "}
            <Rate className=" " disabled allowHalf value={2.5} style={{ fontSize: 14 }} />
            <span className="ml-2 text-xs">(36 Reviews)</span>
          </div>
        </div>
      </div>
      <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: description }} />{" "}
    </div>
  );
};

export default ProductBrandDetails;
