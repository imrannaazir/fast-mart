import { cn } from "@/lib/utils";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  // routes
  const routes = [
    {
      icon: Home,
      href: `/`,
      label: "Dashboard",
      isActive: true,
    },
    {
      icon: Home,
      href: `/add-product`,
      label: "Add Product",
      isActive: true,
    },
  ];
  return (
    <nav
      className={cn(" h-full overflow-y-scroll custom-scrollbar ", className)}
      {...props}
    >
      <div className="h-full w-full flex flex-col justify-between px-4 py-6">
        {/* top */}
        <div className="flex-grow ">
          <h1 className="  text-xl font-semibold">Web Name</h1>

          {routes.length > 0 &&
            routes?.map((item) => (
              <Link
                className="flex items-center"
                to={item.href}
                key={item.href}
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ))}
        </div>
      </div>
    </nav>
  );
}
