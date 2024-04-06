import { Outlet } from "react-router-dom";
import LeftSidebar from "../navbar/left-sidebar";
import Navbar from "../navbar/navbar";

const MainLayout = () => {
  return (
    <div className="w-full">
      <Navbar />
      <div className="flex">
        <LeftSidebar />
        <div className="p-4 w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
