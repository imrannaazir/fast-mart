import { Outlet } from "react-router-dom";
import LeftSidebar from "../navbar/left-sidebar";
import Navbar from "../navbar/navbar";

const MainLayout = () => {
  return (
    <>
      <div className="flex flex-row">
        <LeftSidebar />
        <div className="flex-grow px-4  ">
          <Navbar />
          <div className=" pt-6">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
