import { LogOut } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { logOut } from "@/redux/features/auth/authSlice";
import { useGetMyDataQuery } from "@/redux/features/user/user-api";
import { useAppDispatch } from "@/redux/hooks";
import { TUser } from "@repo/utils/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { NotificationDropdown } from "./notification-dropdown";

const HeaderEnd = () => {
  const dispatch = useAppDispatch();
  const { data, isFetching } = useGetMyDataQuery("");
  const me = data?.data as TUser;
  const [logout] = useLogoutMutation();

  const onLogout = async () => {
    await logout(undefined);
    dispatch(logOut());
  };

  if (isFetching) {
    return <HeaderEndSkeleton />;
  }
  return (
    <div className="flex items-center justify-end gap-2">
      <NotificationDropdown />
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <div className="bg-primary text-background flex items-center justify-between gap-2 rounded-lg p-1 md:pr-2">
            <Avatar className="h-7 w-7 rounded-lg">
              <AvatarImage src={me?.photo?.url} />
              <AvatarFallback>{me?.firstName?.slice(0, 1)}</AvatarFallback>
            </Avatar>
            <p className="hidden text-sm font-medium md:block">{`${me?.firstName || ""} ${me?.lastName || ""}`}</p>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="z-[999] w-56" side="bottom" align="end">
          <DropdownMenuLabel className="flex items-center gap-2">
            <Avatar className="h-7 w-7 rounded-lg">
              <AvatarImage src={me?.photo?.url} />
              <AvatarFallback>{me?.firstName?.slice(0, 1)}</AvatarFallback>
            </Avatar>
            <div>
              <h3>{`${me?.firstName || ""} ${me?.lastName || ""}`}</h3>
              <p className="text-xs font-normal">{me?.email}</p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={onLogout} className="cursor-pointer">
            <div className="flex h-full gap-2">
              <LogOut className="my-auto h-4 w-4" />
              <p className="mb-[1px] text-sm">Log out</p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default HeaderEnd;

const HeaderEndSkeleton = () => {
  return (
    <div className="bg-foreground col-span-3 ml-auto flex h-9 items-center justify-between gap-2 rounded-lg px-2 xl:col-span-2">
      <div className="bg-muted-foreground h-7 w-7 animate-pulse rounded-full"></div>
      <div className="bg-muted-foreground h-3 w-16 animate-pulse rounded-full"></div>
    </div>
  );
};
