import AppReviewCard from "@/components/ui/AppReviewCard";
import { Divider, Flex, Progress, Rate } from "antd";
import { FaStar } from "react-icons/fa";
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

  const productRatings = [
    {
      id: "rev_01",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      fullName: "Sarah Mitchell",
      dateTime: "2024-03-15T14:30:00Z",
      rating: 5,
      comment:
        "Absolutely love this product! The quality exceeded my expectations and the customer service was outstanding.",
    },
    {
      id: "rev_02",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      fullName: "Michael Chen",
      dateTime: "2024-03-14T09:15:00Z",
      rating: 4,
      comment: "Great product overall. Would have given 5 stars but delivery took a bit longer than expected.",
    },
    {
      id: "rev_03",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      fullName: "Emma Thompson",
      dateTime: "2024-03-13T16:45:00Z",
      rating: 5,
      comment: "Perfect fit for my needs. The attention to detail is remarkable. Will definitely purchase again!",
    },
    {
      id: "rev_04",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      fullName: "David Rodriguez",
      dateTime: "2024-03-12T11:20:00Z",
      rating: 3,
      comment: "Decent product but there's room for improvement. The material could be more durable.",
    },
    {
      id: "rev_05",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
      fullName: "Lisa Wang",
      dateTime: "2024-03-11T13:50:00Z",
      rating: 5,
      comment: "Exactly what I was looking for! Fast shipping and excellent packaging.",
    },
    {
      id: "rev_06",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6",
      fullName: "James Wilson",
      dateTime: "2024-03-10T15:25:00Z",
      rating: 4,
      comment: "Very satisfied with my purchase. The product works as advertised.",
    },
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold"> 6 Review For iPhone 15 Max pro</h2>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="flex items-center gap-6">
          <h1 className="text-7xl">3.50</h1>
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
        {productRatings.map((review) => (
          <AppReviewCard key={review.id} {...review} />
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;
