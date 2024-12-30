"use client";

import { TrendingUp } from "lucide-react";
import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useGetCustomerInsightsQuery } from "@/redux/features/dashboard/dashboard-api";
import { TCustomerInsights } from "@repo/utils/types";
import { Skeleton } from "../ui/skeleton";
import { DashboardCardHeader } from "./card-header";
export function CustomerInsights() {
  const { data, isFetching, error } = useGetCustomerInsightsQuery("");
  const customerInsights = data?.data as TCustomerInsights;

  const chartData = [
    { status: "active", users: customerInsights?.active, fill: "var(--color-active)" },
    { status: "pending", users: customerInsights?.pending, fill: "var(--color-pending)" },
    { status: "blocked", users: customerInsights?.blocked, fill: "var(--color-blocked)" },
  ];

  const chartConfig = {
    users: {
      label: "Visitors",
    },
    active: {
      label: "Active",
      color: "hsl(var(--chart-1))",
    },
    pending: {
      label: "Pending",
      color: "hsl(var(--chart-2))",
    },
    blocked: {
      label: "Blocked",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig;

  const totalUsers = chartData.reduce((acc, curr) => acc + curr.users, 0);

  let content: React.ReactNode;
  if (isFetching) {
    content = <Skeleton className="mx-auto aspect-square max-h-[250px] rounded-full" />;
  } else if (!isFetching && !error) {
    content = (
      <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Pie data={chartData} dataKey="users" nameKey="status" innerRadius={60} strokeWidth={5}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                      <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                        {totalUsers.toLocaleString()}
                      </tspan>
                      <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                        Customers
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    );
  }

  return (
    <Card className="flex flex-col">
      <DashboardCardHeader
        title="Customer Insights
"
        description="All customers insights in the fastmart"
      />
      <CardContent className="flex-1 pb-0">{content}</CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Customer insights <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">Showing total users status insights!</div>
      </CardFooter>
    </Card>
  );
}
