"use client";
import { Button, Divider, Empty } from "antd";
import CartItem from "./CartItem";
import Link from "next/link";
import { useCartList } from "@/contexts/cartlist-context";
import { cn } from "@/libs/utils";

const DropdownCart = () => {
  const { cartList } = useCartList();

  return (
    <div className={cn("flex flex-col", !!cartList?.length && "gap-6")}>
      {!!cartList.length && cartList?.map((item) => <CartItem key={item._id} cartItem={item} />)}
      {!cartList.length && <Empty className="min-w-[288px]" image={Empty.PRESENTED_IMAGE_SIMPLE} />}
      <Divider />
      {/* total  and action*/}
      <div className={cn(!!cartList?.length && "space-y-4")}>
        <div className={cn(!cartList?.length ? "hidden" : "flex items-center justify-between")}>
          <p className="text-base">Total :</p>
          <h3 className="text-primary text-lg font-bold">$143.5</h3>
        </div>
        <div className="flex items-center justify-between gap-4">
          <Link href={"/cart"} className={cn(!cartList?.length && "ml-auto")}>
            <Button type="primary" ghost>
              View Cart
            </Button>
          </Link>
          <Button className={cn(!cartList?.length ? "hidden" : "block")} type="primary">
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DropdownCart;
