import React from "react";

interface SectionTitleProps {
  subtitle: string;
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ subtitle, title }) => {
  return (
    <div className="mb-12 text-center">
      <h3 className="mb-2 text-xl font-medium italic text-teal-500">{subtitle}</h3>
      <h2 className="relative inline-block text-3xl font-bold text-gray-900">
        {title}
        <span className="absolute bottom-0 left-0 -mb-2 h-1 w-full scale-x-50 transform bg-orange-400"></span>
      </h2>
    </div>
  );
};

export default SectionTitle;
