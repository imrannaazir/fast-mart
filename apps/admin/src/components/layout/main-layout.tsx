import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { setIsDirty } from "@/redux/features/header/header-slice";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AlertModal from "../modal/alert-modal";
import Modal from "../ui/modal";
import AppHeader from "./app-header";
import { AppSidebar } from "./app-sidebar";

export default function MainLayout() {
  const dispatch = useAppDispatch();
  const pathname = useLocation();
  // clear header state
  useEffect(() => {
    dispatch(setIsDirty(false));
  }, [dispatch, pathname]);

  return (
    <SidebarProvider>
      <Modal />
      <AlertModal />
      <AppSidebar />
      <SidebarInset className="flex w-full flex-1 flex-col">
        <AppHeader />
        <div className="bg-muted flex-1 overflow-auto p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
