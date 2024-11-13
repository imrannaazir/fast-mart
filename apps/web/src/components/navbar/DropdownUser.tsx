"use client";
import assets from "@/assets";
import { useGetSession } from "@/libs/auth-utils";
import { Avatar, Divider, Dropdown, theme } from "antd";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AppLinkButton from "../ui/AppLinkButton";
const { useToken } = theme;
const DropdownUser = () => {
  const { token } = useToken();

  const contentStyle: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  const { session } = useGetSession();
  const router = useRouter();

  let userRoutes = [
    { id: 1, label: "Login", onClickHandler: () => router.push("/login") },
    { id: 2, label: "Register", onClickHandler: () => router.push("/register") },
    { id: 3, label: "Forgot Password", onClickHandler: () => router.push("/forgot-password") },
  ];
  if (session?.user.userId) {
    userRoutes = [
      { id: 1, label: "Dashboard", onClickHandler: () => router.push("/user/dashboard") },
      { id: 2, label: "Logout", onClickHandler: () => signOut({ callbackUrl: "/login" }) },
    ];
  }
  return (
    <Dropdown
      menu={{}}
      dropdownRender={() => (
        <div className="mt-3 max-w-[320px] px-6 py-4" style={contentStyle}>
          {/* user data */}

          {session?.user?.userId && (
            <>
              <div className="flex flex-col items-center justify-center">
                <Avatar src={""} style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}>
                  {session?.user?.email?.slice(0, 1)?.toUpperCase()}
                </Avatar>
                <h3 className="text-lg">Imran Nazir</h3>
                <p>{session?.user?.email}</p>
              </div>
              <Divider className="my-2" />
            </>
          )}
          <div className="flex flex-col gap-2">
            {userRoutes.map((item, i) => {
              return (
                <div className="hover:text-foreground group" key={i} onClick={item.onClickHandler}>
                  <AppLinkButton>{item.label}</AppLinkButton>
                </div>
              );
            })}
          </div>
        </div>
      )}
      placement="bottomRight"
    >
      {session?.user?.userId ? (
        <Avatar className="cursor-pointer" src={""} style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}>
          {session?.user?.email?.slice(0, 1)?.toUpperCase()}
        </Avatar>
      ) : (
        <Image src={assets.svg.user} height={24} width={24} alt="user" />
      )}
    </Dropdown>
  );
};

export default DropdownUser;
