import Image from "next/image";
import SidebarSectionHeader from "./SidebarSectionHeader";
import assets from "@/assets";

const CustomerCommentsSidebar = () => {
  return (
    <div className="p-6 bg-gray-100 rounded-md   space-y-6  sticky top-4">
      <SidebarSectionHeader level="Customer Comment" />
      {/* comments */}
      <div className="  ">
        <h3 className="font-semibold">We Care About Our Customer Experience</h3>
        <p className=" leading-7 text-sm text-gray-500 mt-4">
          In publishing and graphic design, Lorem ipsum is a placeholder text
          commonly used to demonstrate the visual form of a document or a
          typeface without relying on meaningful content.
        </p>
        {/* team member  */}
        <div className="flex items-center gap-4 mt-10">
          <Image
            className="w-[70px] h-[70px] rounded-full  "
            src={assets.images.sales_manager}
            width={246}
            height={264}
            alt="team-member"
          />
          <div>
            {/* name */}
            <h3 className="text-lg font-medium ">Tina Mcdonnale</h3>
            {/* designation */}
            <p className="text-gray-500">Sale Manager</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerCommentsSidebar;
