import { Outlet } from "react-router-dom";
import LeftSidebar from "../navbar/left-sidebar";
import Navbar from "../navbar/navbar";

const MainLayout = () => {
  return (
    <div className="flex h-screen">
      <LeftSidebar />
      <div className="w-full">
        <Navbar />
        <div className=" pt-6 px-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
