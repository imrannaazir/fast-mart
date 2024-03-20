import { useAppSelector } from "@/redux/hooks";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { selectCartItems } from "@/redux/features/cart/cartSlice";
import { formatCurrency } from "@/lib/utils";

const BillDetails = () => {
  const cartItems = useAppSelector(selectCartItems);
  const total = cartItems.reduce(
    (total, item) => total + Number(item.price * item.quantity),
    0
  );

  const discount = 0;
  const vat = 0;
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Bill Details</CardTitle>
        </CardHeader>
        <CardContent>
          {/* <!-- sub total --> */}
          <div className="flex items-center justify-between">
            <p>Sub Total</p>
            <p>
              USD <span className=" ">{formatCurrency(total)}</span>
            </p>
          </div>

          {/* <!-- Discount --> */}
          <div className="flex items-center justify-between">
            <p>Discount</p>
            <p>
              USD <span className=" ">{formatCurrency(discount)}</span>
            </p>
          </div>

          {/* <!-- VAT --> */}
          <div className="flex items-center justify-between">
            <p>VAT</p>
            <p>
              USD <span className="vat">{formatCurrency(vat)}</span>
            </p>
          </div>

          {/* <!-- Total --> */}
          <div className="flex items-center justify-between pb-4">
            <p className="font-bold">TOTAL</p>
            <p className="font-bold">
              USD{" "}
              <span className=" ">
                {formatCurrency(total + discount + vat)}
              </span>
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Place Order</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BillDetails;
