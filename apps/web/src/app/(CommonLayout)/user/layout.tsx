import AppBreadcrumb, { TAppBreadcrumbItem } from "@/components/ui/AppBreadcrumb";
import Container from "@/components/ui/Container";
import { ReactNode } from "react";

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
      <Container className="grid grid-cols-4">
        <aside>sidebar</aside>
        <div className="col-span-3">{children}</div>
      </Container>
    </>
  );
};

export default UserLayout;
