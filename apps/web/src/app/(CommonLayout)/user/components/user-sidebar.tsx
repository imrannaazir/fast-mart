import assets from "@/assets";
import { Avatar } from "antd";
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
          <Avatar
            size={100}
            src={
              <img
                src={"https://img.freepik.com/free-photo/portrait-father-his-backyard_23-2149489567.jpg"}
                alt="avatar"
              />
            }
          />
        </div>
      </div>
      sidebar
    </aside>
  );
};

export default UserSidebar;
