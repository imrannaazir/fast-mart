import { Star } from "lucide-react";
import React from "react";
import { FaQuoteRight } from "react-icons/fa";

interface TestimonialCardProps {
  rating: number;
  title: string;
  content: string;
  author: {
    name: string;
    role: string;
    image: string;
  };
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ rating, title, content, author }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
      {/* Rating Stars */}
      <div className="mb-4 flex gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`h-5 w-5 ${index < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
          />
        ))}
      </div>

      {/* Title */}
      <h3 className="mb-4 text-xl font-semibold text-gray-900">{title}</h3>

      {/* Content */}
      <p className="mb-6 leading-relaxed text-gray-600">{content}</p>

      {/* Author */}
      <div className="flex items-center gap-4">
        <img src={author.image} alt={author.name} className="h-12 w-12 rounded-full object-cover" />
        <div>
          <h4 className="font-medium text-teal-500">{author.name}</h4>
          <p className="text-sm text-gray-500">{author.role}</p>
        </div>
      </div>

      {/* Quote Decoration */}
      <FaQuoteRight className="absolute -right-4 bottom-0 rotate-[20deg] text-7xl text-gray-100 transition-all duration-300 group-hover:right-0 group-hover:rotate-0 group-hover:text-8xl group-hover:text-teal-100" />
    </div>
  );
};

export default TestimonialCard;
