import { Divider, Flex, Progress, Rate } from "antd";
import { FaStar } from "react-icons/fa";
import AppReviewCard from "@/components/ui/AppReviewCard";
const ProductReviews = () => {
  const ratingsProgress = [
    {
      value: 7,
      percent: 46,
      star: 5,
    },
    {
      value: 5,
      percent: 60,
      star: 4,
    },
    {
      value: 4,
      percent: 70,
      star: 3,
    },
    {
      value: 6,
      percent: 30,
      star: 2,
    },
    {
      value: 5,
      percent: 80,
      star: 1,
    },
  ];
  return (
    <div>
      <h2 className="text-xl font-semibold"> 2 Review For iPhone 15 Max pro</h2>
      <div className="grid grid-cols-2 gap-6">
        <div className="flex items-center gap-6">
          <h1 className="text-8xl">3.50</h1>
          <div>
            <Rate
              value={3.6}
              style={{
                fontSize: 24,
              }}
            />
            <p className="">
              <span>Average of</span> <b className="font-bold">2 reviews</b>
            </p>
          </div>
        </div>
        <Flex gap="small" vertical>
          {ratingsProgress.map((item) => (
            <div key={item.star} className="flex items-center gap-2">
              <FaStar className="text-[#fadb14]" size={16} />
              <span>{item.star}</span>
              <Progress size={"small"} percent={item.percent} showInfo={false} />
              <span>{item.value}</span>
            </div>
          ))}
        </Flex>
      </div>
      <Divider />
      <div className="space-y-4">
        {new Array(10).fill(null).map((_review) => (
          <AppReviewCard />
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;
