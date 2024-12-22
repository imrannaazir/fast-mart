import { LucideIcon } from "lucide-react";
import React from "react";

interface StatsCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  number: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon: Icon, title, description, number }) => {
  return (
    <div className="group rounded-2xl bg-white p-8 shadow-md">
      <div className="flex flex-col">
        <div className="flex w-full items-end justify-between">
          <Icon className="h-12 w-12 text-teal-500" />
          <span className="flex justify-end text-6xl font-bold text-gray-100 transition-all duration-300 group-hover:pr-3 group-hover:text-gray-200">
            {number}
          </span>
        </div>
        <h3 className="my-3 text-2xl font-semibold text-gray-900 group-hover:text-teal-400">{title}</h3>
        <p className="leading-relaxed text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default StatsCard;
