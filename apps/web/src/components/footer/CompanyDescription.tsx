import { AiOutlineHome } from "react-icons/ai";
import AppLogo from "../ui/AppLogo";
import { FaRegEnvelope } from "react-icons/fa";

const CompanyDescription = () => {
  return (
    <div className="mr-4 space-y-3">
      <AppLogo />
      <p className="text-gray-600">
        We are a friendly bar serving a variety of cocktails, wines and beers. Our bar is a perfect place for a couple.
      </p>

      <div className="space-y-3">
        <button className="hover:text-primary flex items-center gap-1 text-gray-600 transition-colors duration-300">
          <AiOutlineHome className="h-5 w-5" />
          <span className="font-medium">1418 Riverwood, CA 62, US</span>
        </button>
        <button className="hover:text-primary flex items-center gap-1 text-gray-600 transition-colors duration-300">
          <FaRegEnvelope className="h-4 w-4" />
          <span className="pl-1 font-medium">support@fastmart.com</span>
        </button>
      </div>
    </div>
  );
};

export default CompanyDescription;
