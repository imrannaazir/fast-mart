"use client";
import { Input } from "antd";
import { BiEnvelope } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";

const { Search } = Input;
const HomePageNewsLetter = () => {
  return (
    <div
      className="my-10 rounded-lg py-6 lg:py-10 lg:px-[211px]"
      style={{
        backgroundImage: `url("/backgrounds/newsletter.jpg")`,
      }}
    >
      <div className="max-w-[400px] px-4">
        <h3 className="text-[28px] font-semibold text-background">
          Join our newsletter and get...
        </h3>
        <p className="text-yellow-400 font-semibold text-lg">
          $20 discount for your first order
        </p>
        <Search
          className="bg-background rounded-lg mt-4"
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
