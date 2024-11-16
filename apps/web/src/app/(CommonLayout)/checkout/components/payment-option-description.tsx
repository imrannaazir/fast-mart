import { Card, Radio } from "antd";
import { BsCashStack } from "react-icons/bs";

const PaymentOptionDescription = () => {
  return (
    <Card className="mt-0 bg-gray-100">
      <Radio.Group className="grid w-full grid-cols-2 gap-6">
        <Card>
          <div className="flex items-start justify-between gap-2">
            <Radio className="flex items-center text-lg">
              <div className="flex items-center gap-1">
                <BsCashStack size={20} />
                <span className="font-semibold">Cash On Delivery</span>
              </div>
            </Radio>
          </div>
        </Card>
      </Radio.Group>
    </Card>
  );
};

export default PaymentOptionDescription;
