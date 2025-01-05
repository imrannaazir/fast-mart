import { cn } from "@/libs/utils";
import { Rate } from "antd";
import Image from "next/image";
import { FC } from "react";
import { ClassNameValue } from "tailwind-merge";

type TAppReviewCard = {
  className?: ClassNameValue;
};
const AppReviewCard: FC<TAppReviewCard> = ({ className }) => {
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
        src={"https://themes.pixelstrap.com/fastkart/assets/images/review/1.jpg"}
        width={70}
        height={70}
        alt="profile pic"
      />
      <div>
        {/*  */}
        <div className="flex flex-col justify-between sm:flex-row sm:items-center md:flex-col md:items-start lg:justify-center">
          <div className="flex items-center gap-2 text-sm">
            <h3 className="text-primary text-base font-semibold">Jack Doe</h3>
            <p className="text-gray-500">29 Sep 2023 06:34:PM</p>
          </div>

          {/* rating */}
          <Rate
            value={4.1}
            style={{
              fontSize: 16,
            }}
          />
        </div>
        <p>
          Honestly, I regret buying this item. The quality is subpar, and it feels like a waste of money. I wouldn't
          recommend it to anyone.
        </p>
      </div>
    </div>
  );
};

export default AppReviewCard;
