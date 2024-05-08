import { Button, Divider } from "antd";
import CartItem from "./CartItem";

const DropdownCart = () => {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 2 }).map((_item, i) => (
        <CartItem key={i} />
      ))}
      <CartItem />
      <Divider />
      {/* total  and action*/}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-base">Total :</p>
          <h3 className="text-primary font-bold text-lg">$143.5</h3>
        </div>
        <div className="flex justify-between items-center gap-4 ">
          <Button type="primary" ghost>
            View Cart
          </Button>
          <Button type="primary">Checkout</Button>
        </div>
      </div>
    </div>
  );
};

export default DropdownCart;
