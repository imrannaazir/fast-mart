import AppBreadcrumb, { TAppBreadcrumbItem } from "@/components/ui/AppBreadcrumb";
import Container from "@/components/ui/Container";
import { ReactNode } from "react";
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
      <AppBreadcrumb items={userBreadcrumb} title="User Dashboard" />
      <Container className="mb-6 grid grid-cols-4">
        <UserSidebar />
        <div className="col-span-3">{children}</div>
      </Container>
    </>
  );
};

export default UserLayout;
