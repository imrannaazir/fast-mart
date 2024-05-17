import assets from "@/assets";
import { Divider, Tooltip } from "antd";
import Image from "next/image";
import { IoEyeOutline } from "react-icons/io5";
import { LuRefreshCw } from "react-icons/lu";
import { light_colors } from "../../../constant/colors.constant";

const AppProductButtons = () => {
  const buttons = [
    {
      id: 1,
      label: "View",
      icon: <IoEyeOutline />,
      onClickHandler: () => {},
    },
    {
      id: 2,
      label: "Compare",
      icon: <LuRefreshCw />,
      onClickHandler: () => {},
    },
    {
      id: 3,
      label: "Wishlist",
      icon: (
        <Image src={assets.svg.love} alt="wishlist" width={16} height={16} />
      ),
      onClickHandler: () => {},
    },
  ];
  return (
    <div className="absolute hidden z-10 bg-white py-2 px-6 rounded-xl shadow-md bottom-10   group-hover:bottom-1  group-hover:flex transition-all duration-300">
      {buttons.map((button, i) => (
        <>
          {i !== 0 && <Divider type="vertical" />}
          <Tooltip
            title={button.label}
            color={light_colors.primary}
            key={button.id}
          >
            {/* <Button> */}
            <button>{button.icon}</button>
            {/* </Button> */}
          </Tooltip>
        </>
      ))}
    </div>
  );
};

export default AppProductButtons;
