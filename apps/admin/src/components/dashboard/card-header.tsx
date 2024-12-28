import { FC } from "react";
import { CardDescription, CardHeader, CardTitle } from "../ui/card";
type TDashboardCardHeaderProps = {
  title: string;
  description?: string;
};
export const DashboardCardHeader: FC<TDashboardCardHeaderProps> = ({ title, description }) => {
  return (
    <CardHeader>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        <div className="bg-primary/10 h-1 w-16 rounded-full" />
      </div>
    </CardHeader>
  );
};
