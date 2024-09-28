import Link from "next/link";
import AppLinkButton from "../ui/AppLinkButton";

const DropdownUser = () => {
  const userRoutes = [
    { id: 1, label: "Login", path: "/login" },
    { id: 2, label: "Register", path: "/register" },
    { id: 3, label: "Forgot Password", path: "/forgot-password" },
  ];
  return (
    <div className="flex flex-col gap-2">
      {userRoutes.map((item, i) => {
        return (
          <Link className="hover:text-foreground group" key={i} href={item.path}>
            <AppLinkButton>{item.label}</AppLinkButton>
          </Link>
        );
      })}
    </div>
  );
};

export default DropdownUser;
