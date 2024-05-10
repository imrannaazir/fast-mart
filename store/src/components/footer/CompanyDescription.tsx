import { AiOutlineHome } from "react-icons/ai";
import AppLogo from "../ui/AppLogo";
import { FaRegEnvelope } from "react-icons/fa";

const CompanyDescription = () => {
  return (
    <div className="space-y-3">
      <AppLogo />
      <p className=" text-gray-600">
        We are a friendly bar serving a variety of cocktails, wines and beers.
        Our bar is a perfect place for a couple.
      </p>

      <div>
        <button className="flex items-center gap-1 text-gray-600 hover:text-primary transition-colors duration-300">
          <AiOutlineHome className="w-3 h-3" />
          <span className="text-[13px] font-medium ">
            1418 Riverwood Drive, CA 96052, US
          </span>
        </button>
        <button className="flex items-center gap-1 text-gray-600 hover:text-primary transition-colors duration-300">
          <FaRegEnvelope className="w-3 h-3" />
          <span className="text-[13px] font-medium ">support@fastmart.com</span>
        </button>
      </div>
    </div>
  );
};

export default CompanyDescription;
