import { formatCurrency } from "@/lib/utils";
import { TOrder, TUser } from "@repo/utils/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const RecentOrderItem = ({ order }: { order: TOrder }) => {
  const { email, firstName, lastName, photo } = (order?.userId || {}) as TUser;
  return (
    <div className="flex items-center">
      <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
        <AvatarImage src={photo?.url} alt={firstName} />
        <AvatarFallback>{firstName.toUpperCase().slice(0, 2)}</AvatarFallback>
      </Avatar>
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">
          {firstName && firstName} {lastName && lastName}
        </p>
        <p className="text-muted-foreground text-sm">{email}</p>
      </div>
      <div className="ml-auto font-medium">+{formatCurrency(order?.netAmount as number)}</div>
    </div>
  );
};

export default RecentOrderItem;
