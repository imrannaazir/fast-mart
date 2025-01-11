import AppBreadcrumb, { TAppBreadcrumbItem } from "@/components/ui/AppBreadcrumb";
import Container from "@/components/ui/Container";
import { ReactNode } from "react";
import MobileUserDrawer from "./components/mobile-user-drawer";
import UserSidebar from "./components/user-sidebar";

const UserLayout = ({ children }: { children: ReactNode }) => {
  const userBreadcrumb: TAppBreadcrumbItem[] = [
    {
      title: "User Dashboard",
      href: "/user/dashboard",
    },
  ];

  return (
    <>
      <AppBreadcrumb items={userBreadcrumb} title="User Dashboard" className="mb-0" />
      <Container className="mb-6 grid grid-cols-4 gap-4 lg:mt-6">
        <MobileUserDrawer className="mt-4 block lg:hidden" />
        <UserSidebar className="sticky top-6 hidden lg:block" />
        <div className="col-span-4 rounded-md bg-gray-100 p-6 lg:col-span-3">{children}</div>
      </Container>
    </>
  );
};

export default UserLayout;
