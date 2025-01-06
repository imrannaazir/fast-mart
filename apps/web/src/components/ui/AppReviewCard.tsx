import { cn } from "@/libs/utils";
import { Rate } from "antd";
import Image from "next/image";
import { FC } from "react";
import { ClassNameValue } from "tailwind-merge";

type TAppReviewCard = {
  id: string;
  avatar: string;
  fullName: string;
  dateTime: string;
  rating: number;
  comment: string;
  className?: ClassNameValue;
};
const AppReviewCard: FC<TAppReviewCard> = ({ className, avatar, fullName, dateTime, rating, comment }) => {
  return (
    <div
      className={cn(
        className,
        "flex w-full flex-col gap-6 rounded-lg bg-gray-100 p-6 shadow-md sm:flex-row md:flex-col lg:flex-row"
      )}
    >
      {/* image */}
      <Image
        className="aspect-square h-[70px] w-[70px] rounded-full border object-cover shadow-sm"
        src={avatar}
        width={70}
        height={70}
        alt="profile pic"
      />
      <div>
        {/*  */}
        <div className="flex flex-col justify-between sm:flex-row sm:items-center md:flex-col md:items-start lg:justify-center">
          <div className="flex items-center gap-2 text-sm">
            <h3 className="text-primary text-base font-semibold">{fullName}</h3>
            <p className="text-gray-500">{dateTime}</p>
          </div>

          {/* rating */}
          <Rate
            value={rating}
            style={{
              fontSize: 16,
            }}
          />
        </div>
        <p>{comment}</p>
      </div>
    </div>
  );
};

export default AppReviewCard;
