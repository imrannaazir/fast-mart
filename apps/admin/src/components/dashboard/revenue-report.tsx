import { CircleX, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useGetRevenueInsightsQuery } from "@/redux/features/dashboard/dashboard-api";
import { getErrorMessage } from "@repo/utils/functions";
import { TRevenueReport } from "@repo/utils/types";
import { ReactNode } from "react";
import { Empty } from "../ui/empty";
import { Skeleton } from "../ui/skeleton";
import { DashboardCardHeader } from "./card-header";

export function RevenueReport() {
  const { data, isFetching, error } = useGetRevenueInsightsQuery("");
  const chartData = data?.data as TRevenueReport[];

  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  let content: ReactNode;
  if (isFetching) {
    content = <Skeleton className="min-h-[320px] w-full rounded-md" />;
  } else if (!isFetching && error) {
    content = <Empty title={getErrorMessage(error)} icon={CircleX} />;
  } else if (!isFetching && !error) {
    content = (
      <ChartContainer config={chartConfig}>
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis dataKey="revenue" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => value} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <defs>
            <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <Area
            dataKey="revenue"
            type="natural"
            fill="url(#fillRevenue)"
            fillOpacity={0.4}
            stroke="var(--color-revenue)"
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
    );
  }

  return (
    <Card>
      <DashboardCardHeader title="Revenue" description="Showing last year's total revenue" />
      <CardContent>{content}</CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Showing total revenue of last year. <TrendingUp className="h-4 w-4" />
            </div>
            {isFetching ? (
              <Skeleton className="h-4 w-48" />
            ) : (
              <div className="text-muted-foreground flex items-center gap-2 leading-none">{`${chartData?.[0]?.month} ${chartData?.[0]?.year} - ${chartData?.[chartData?.length - 1]?.month} ${chartData?.[chartData?.length - 1]?.year}`}</div>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
