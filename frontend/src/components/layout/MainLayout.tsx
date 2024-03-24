import { Outlet } from "react-router-dom";
import LeftSidebar from "../navbar/left-sidebar";
import Navbar from "../navbar/navbar";

const MainLayout = () => {
  return (
    <>
      <div className="flex flex-row">
        <LeftSidebar />
        <div className="flex-grow ">
          <Navbar />
          <div className=" pt-6 px-4">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
