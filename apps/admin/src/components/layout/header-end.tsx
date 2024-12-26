import { Bell, LogOut } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { logOut, selectUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

const HeaderEnd = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [logout] = useLogoutMutation();

  const onLogout = async () => {
    await logout(undefined);
    dispatch(logOut());
  };
  return (
    <div className="flex items-center justify-end gap-2">
      <Button className="h-9" variant={"default"} size={"icon"}>
        <Bell />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <div className="bg-primary text-background flex items-center justify-between gap-2 rounded-lg p-1 pr-2">
            <Avatar className="h-7 w-7 rounded-lg">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="text-sm font-medium">John Doe</p>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="z-[999] w-56" side="bottom" align="end">
          <DropdownMenuLabel className="flex items-center gap-2">
            <Avatar className="h-7 w-7 rounded-lg">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h3>John doe</h3>
              <p className="text-xs font-normal">{user?.email}</p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={onLogout}>
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
