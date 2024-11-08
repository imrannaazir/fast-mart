import assets from "@/assets";
import { Avatar, Divider } from "antd";
import { Edit } from "lucide-react";
import Image from "next/image";
const UserSidebar = () => {
  return (
    <aside className="rounded-md bg-gray-100">
      <div className="relative w-full">
        <Image
          src={assets.images.banners.user_cover}
          width={300}
          height={150}
          alt="user-cover"
          className="aspect-[2/1] w-full rounded-t-md object-cover"
        />

        {/* avatar */}
        <div className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-100 p-1">
          <div>
            <Avatar
              size={100}
              src={
                <img
                  src={"https://img.freepik.com/free-photo/portrait-father-his-backyard_23-2149489567.jpg"}
                  alt="avatar"
                />
              }
            />
            <div className="bg-background absolute bottom-2 right-0 rounded-full p-2">
              <Edit size={20} />
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        {/* user details  */}
        <div className="mt-12 text-center">
          <h2 className="text-[22px] font-semibold">Imran Nazir </h2>
          <p className="text-sm font-medium text-gray-500">imrannaaziremon@gmail.com</p>
        </div>
        <Divider className="" />
        sidebar
      </div>
    </aside>
  );
};

export default UserSidebar;
