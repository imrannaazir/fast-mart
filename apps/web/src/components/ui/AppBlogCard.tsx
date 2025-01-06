"use client";

import { cn } from "@/libs/utils";
import { TBlogPost } from "@repo/utils/types";
import { ClassValue } from "clsx";
import Image from "next/image";
import { FC } from "react";
type TAppBlogCardProps = {
  className?: ClassValue;
  post: TBlogPost;
};

const AppBlogCard: FC<TAppBlogCardProps> = ({ className, post }) => {
  return (
    <div className={cn("group cursor-pointer", className)}>
      <div className="w-full overflow-hidden rounded-md border">
        <Image
          className="aspect-square rounded-md object-cover transition-all duration-300 group-hover:rotate-3 group-hover:scale-110"
          src={post.imageUrl}
          width={464}
          height={300}
          alt={post.title}
        />
      </div>
      <div className="mt-4 text-start">
        <p className="text-sm font-medium text-gray-700">{post.date}</p>
        <h3 className="group-hover:text-primary text-lg font-semibold transition-colors duration-300">{post.title}</h3>
      </div>
    </div>
  );
};

export default AppBlogCard;
