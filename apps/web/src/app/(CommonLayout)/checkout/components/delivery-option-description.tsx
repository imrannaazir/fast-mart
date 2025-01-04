import { Card, Radio } from "antd";

const DeliveryOptionDescription = () => {
  return (
    <Card className="mt-0 bg-gray-100">
      <Radio.Group className="grid w-full gap-6 lg:grid-cols-2">
        <Card>
          <div className="flex items-start justify-between gap-2">
            <Radio className="mt-1 flex items-start text-lg">Standard Delivery Option</Radio>
          </div>
        </Card>
      </Radio.Group>
    </Card>
  );
};

export default DeliveryOptionDescription;
