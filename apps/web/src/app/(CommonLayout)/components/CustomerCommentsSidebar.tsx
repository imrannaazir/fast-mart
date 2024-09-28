import Image from "next/image";
import SidebarSectionHeader from "./SidebarSectionHeader";
import assets from "@/assets";

const CustomerCommentsSidebar = () => {
  return (
    <div className="sticky top-4 space-y-6 rounded-md bg-gray-100 p-6">
      <SidebarSectionHeader level="Customer Comment" />
      {/* comments */}
      <div className=" ">
        <h3 className="font-semibold">We Care About Our Customer Experience</h3>
        <p className="mt-4 text-sm leading-7 text-gray-500">
          In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual
          form of a document or a typeface without relying on meaningful content.
        </p>
        {/* team member  */}
        <div className="mt-10 flex items-center gap-4">
          <Image
            className="h-[70px] w-[70px] rounded-full"
            src={assets.images.sales_manager}
            width={246}
            height={264}
            alt="team-member"
          />
          <div>
            {/* name */}
            <h3 className="text-lg font-medium">Tina Mcdonnale</h3>
            {/* designation */}
            <p className="text-gray-500">Sale Manager</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerCommentsSidebar;
