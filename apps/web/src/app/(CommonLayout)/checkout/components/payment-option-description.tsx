import { useOrderContext } from "@/contexts/order-context";
import { Card, Radio, RadioChangeEvent } from "antd";
import { BsCashStack } from "react-icons/bs";
import StripeElements from "./stripe-elements";

const PaymentOptionDescription = () => {
  const { paymentType, setPaymentType } = useOrderContext();
  const onPaymentTypeChange = (e: RadioChangeEvent) => {
    setPaymentType(e.target.value);
  };
  return (
    <Card className="mt-0 bg-gray-100">
      <Radio.Group className="grid w-full gap-6 lg:grid-cols-2" value={paymentType} onChange={onPaymentTypeChange}>
        {["CARD", "COD"]?.map((type) => (
          <Card>
            <div className="flex items-start justify-between gap-2">
              <Radio value={type} className="flex items-center text-lg">
                <div className="flex items-center gap-1">
                  <BsCashStack size={20} />
                  <span className="font-semibold">{type === "cod" ? "Cash On Delivery" : "Credit or Debit Card"}</span>
                </div>
              </Radio>
            </div>
          </Card>
        ))}
      </Radio.Group>

      {paymentType === "CARD" && <StripeElements />}
    </Card>
  );
};

export default PaymentOptionDescription;
