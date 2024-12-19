"use client";
import assets from "@/assets";
import { useUser } from "@/contexts/user-context";
import { Avatar, Divider, GetProp, Menu, MenuProps } from "antd";
import { Edit, Heart } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { LuHome, LuMapPin, LuShoppingBag } from "react-icons/lu";

const UserSidebar = () => {
  type MenuItem = GetProp<MenuProps, "items">[number];
  const pathname = usePathname();
  const pathnameArr = pathname.split("/");
  const currentPage = pathnameArr[pathnameArr.length - 1];
  const router = useRouter();
  const items: MenuItem[] = [
    {
      key: "dashboard",
      icon: <LuHome size={16} />,
      label: "Dashboard",
      onClick: () => router.push("/user/dashboard"),
    },
    {
      key: "order",
      icon: <LuShoppingBag size={16} />,
      label: "Order",
      onClick: () => router.push("/user/order"),
    },
    {
      key: "wishlist",
      icon: <Heart size={16} />,
      label: "Wishlist",
      onClick: () => router.push("/user/wishlist"),
    },
    {
      key: "address",
      icon: <LuMapPin size={16} />,
      label: "Address",

      onClick: () => router.push("/user/address"),
    },
  ];
  const { user } = useUser();
  return (
    <aside className="sticky top-6 h-fit rounded-md bg-gray-100">
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
          <h2 className="text-[22px] font-semibold">
            {user?.firstName || "Not added"} {user?.lastName || ""}{" "}
          </h2>
          <p className="text-sm font-medium text-gray-500">{user?.email}</p>
        </div>
        <Divider style={{ margin: 10 }} />

        <Menu
          style={{ border: 0 }}
          className="bg-transparent"
          selectedKeys={[currentPage!]}
          defaultSelectedKeys={["dashboard"]}
          mode={"vertical"}
          items={items}
        />
      </div>
    </aside>
  );
};

export default UserSidebar;
