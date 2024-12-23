import { FacebookFilled, InstagramOutlined, PinterestFilled, TwitterOutlined } from "@ant-design/icons";
import Image from "next/image";
import React from "react";

interface TeamMemberProps {
  image: string;
  name: string;
  role: string;
  description: string;
}

const TeamMemberCard: React.FC<TeamMemberProps> = ({ image, name, role, description }) => {
  return (
    <div className="px-4 text-center">
      <div className="mx-auto mb-6 h-[280px] w-[280px] overflow-hidden rounded-full">
        <Image src={image} width={280} height={280} alt={name} className="h-full w-full object-cover grayscale" />
      </div>
      <h3 className="mb-1 text-2xl font-semibold text-gray-900">{name}</h3>
      <p className="mb-4 text-gray-600">{role}</p>
      <p className="mx-auto mb-6 max-w-xs text-sm text-gray-500">{description}</p>
      <div className="flex justify-center space-x-3">
        {[FacebookFilled, PinterestFilled, TwitterOutlined, InstagramOutlined].map((Icon, index) => (
          <a
            key={index}
            href="#"
            className="rounded-lg bg-gray-100 p-2 transition-colors hover:bg-teal-500 hover:text-white"
          >
            <Icon className="text-base" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default TeamMemberCard;
