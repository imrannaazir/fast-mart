"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { Bell } from "lucide-react";
export type TNotification = {
  id: string;
  name: string;
  avatar: string;
  message: string;
  date: string;
  read: boolean;
};

export function NotificationDropdown() {
  const notifications = [
    {
      id: "1",
      name: "Sarah Wilson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      message: "placed a new order worth $156.98",
      date: "2024-03-25T09:12:00",
      read: false,
    },
    {
      id: "2",
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
      message: "left a 5-star review on Premium Headphones",
      date: "2024-03-25T08:30:00",
      read: false,
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      message: "requested a refund for order #45678",
      date: "2024-03-24T15:45:00",
      read: true,
    },
    {
      id: "4",
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      message: "subscribed to your newsletter",
      date: "2024-03-24T12:20:00",
      read: true,
    },
    {
      id: "5",
      name: "Lisa Thompson",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
      message: "added 3 items to their wishlist",
      date: "2024-03-24T10:15:00",
      read: true,
    },
  ];
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="relative h-9 focus:ring-1 focus-visible:ring-0 focus-visible:ring-offset-0"
          variant={"default"}
          size={"icon"}
        >
          <Bell />
          {unreadCount > 0 && (
            <span className="bg-primary text-primary-foreground absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px]">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-[999] mt-0 w-[380px]" align="end">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="text-xs">
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="max-h-[450px] overflow-auto">
          {notifications.map((notification) => (
            <DropdownMenuItem key={notification.id} className="cursor-pointer">
              <NotificationItem notification={notification} />
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-primary cursor-pointer justify-center font-medium">
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function NotificationItem({ notification }: { notification: TNotification }) {
  return (
    <div className={cn("flex w-full items-start gap-4 p-2", !notification.read && "bg-muted/50")}>
      <Avatar className="h-9 w-9">
        <AvatarImage className="object-cover" src={notification.avatar} />
        <AvatarFallback>{notification.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <p className="text-sm">
          <span className="font-medium">{notification.name}</span> {notification.message}
        </p>
        <p className="text-muted-foreground text-xs">
          {formatDistanceToNow(new Date(notification.date), { addSuffix: true })}
        </p>
      </div>
      {!notification.read && <div className="bg-primary h-2 w-2 rounded-full" />}
    </div>
  );
}
