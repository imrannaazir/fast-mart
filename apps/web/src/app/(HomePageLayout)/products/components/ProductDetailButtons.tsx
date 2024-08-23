import assets from "@/assets";
import { Button, Divider } from "antd";
import Image from "next/image";
import { Fragment } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { LuRefreshCw } from "react-icons/lu";

const ProductDetailButtons = () => {
  return (
    <Fragment>
      <div className="mt-6 grid w-full grid-cols-3 gap-4">
        <div className="flex w-full items-center justify-between rounded-md bg-gray-100 p-1">
          <button className="rounded-md bg-white p-3">
            <FaMinus size={10} className="text-primary" />
          </button>
          <p>Add</p>
          <button className="rounded-md bg-white p-3">
            <FaPlus size={10} className="text-primary" />
          </button>
        </div>
        <Button type="primary" size="large" className="col-span-2">
          Add To Cart
        </Button>
      </div>
      <Divider className="mb-3" />
      <div>
        <Button type="link" className="text-foreground">
          <Image src={assets.svg.love} alt="wishlist" width={16} height={16} /> <span>Add To Wishlist</span>
        </Button>
        <Button type="link" className="text-foreground">
          <LuRefreshCw size={16} />
          <span>Add To Compare</span>
        </Button>
      </div>
      <Divider className="mt-3" />
    </Fragment>
  );
};

export default ProductDetailButtons;
