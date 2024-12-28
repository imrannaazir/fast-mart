import { Package } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Progress } from "../ui/progress";
import { DashboardCardHeader } from "./card-header";

const products = [
  { name: "Wireless Earbuds", sales: 1234, percentage: 85 },
  { name: "Smart Watch", sales: 987, percentage: 72 },
  { name: "Laptop Stand", sales: 756, percentage: 61 },
  { name: "Phone Case", sales: 543, percentage: 45 },
  { name: "Portable Charger", sales: 432, percentage: 38 },
  { name: "Portable Charger", sales: 432, percentage: 38 },
];

export function TopProducts() {
  return (
    <Card>
      <DashboardCardHeader title="Top products" description="Showing most sold products" />
      <CardContent>
        <div className="space-y-8">
          {products.map((product) => (
            <div key={product.name} className="flex items-center">
              <Package className="text-muted-foreground mr-4 h-4 w-4" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{product.name}</p>
                <p className="text-muted-foreground text-sm">{product.sales} sales</p>
              </div>
              <div className="ml-auto w-24">
                <Progress value={product.percentage} className="h-2" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
