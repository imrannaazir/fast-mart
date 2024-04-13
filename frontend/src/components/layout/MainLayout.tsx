import { Outlet } from "react-router-dom";
import LeftSidebar from "../navbar/left-sidebar";
import Navbar from "../navbar/navbar";
import AlertModal from "../modal/alert-modal";

const MainLayout = () => {
  return (
    <>
      <AlertModal />
      <div className="w-full">
        <Navbar />
        <div className="flex">
          <LeftSidebar />
          <div className="p-4 w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
