import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";
import { DashboardCardHeader } from "./card-header";

export function RecentOrders() {
  return (
    <Card>
      <DashboardCardHeader title="Recent sales" description="Showing recent orders" />
      <CardContent>
        <div className="space-y-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center">
              <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
                <AvatarImage src="/avatars/02.png" alt="Avatar" />
                <AvatarFallback>JL</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">Jackson Lee</p>
                <p className="text-muted-foreground text-sm">jackson.lee@email.com</p>
              </div>
              <div className="ml-auto font-medium">+$39.00</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
