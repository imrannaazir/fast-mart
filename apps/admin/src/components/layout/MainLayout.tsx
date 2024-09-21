import { Outlet, useLocation } from "react-router-dom";
import LeftSidebar from "../navbar/left-sidebar";
import Navbar from "../navbar/navbar";
import AlertModal from "../modal/alert-modal";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect } from "react";
import { resetFilters } from "@/redux/features/filter/filterSlice";
import Modal from "../ui/modal";

export default function MainLayout() {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(resetFilters());
  }, [dispatch, pathname]);

  return (
    <>
      <AlertModal />
      <Modal />
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex flex-1">
          <LeftSidebar />
          <div className="bg-muted flex-1 overflow-auto p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
