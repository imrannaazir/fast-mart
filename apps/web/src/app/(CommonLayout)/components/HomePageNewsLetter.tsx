"use client";
import { Input } from "antd";
import { BiEnvelope } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";

const { Search } = Input;
const HomePageNewsLetter = () => {
  return (
    <div
      className="my-10 rounded-lg py-6 lg:px-[211px] lg:py-10"
      style={{
        backgroundImage: `url("/backgrounds/newsletter.jpg")`,
      }}
    >
      <div className="max-w-[400px] px-4">
        <h3 className="text-background text-[28px] font-semibold">Join our newsletter and get...</h3>
        <p className="text-lg font-semibold text-yellow-400">$20 discount for your first order</p>
        <Search
          className="bg-background mt-4 rounded-lg"
          size="large"
          addonBefore={<BiEnvelope className="text-primary" />}
          placeholder="Enter Your Email"
          allowClear
          enterButton={
            <div className="flex items-center gap-1">
              Subscribe <BsArrowRight />
            </div>
          }
        />
      </div>
    </div>
  );
};

export default HomePageNewsLetter;
