import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
const RevenueReport = () => {
  const data = [
    { month: "Jan", revenue: 60 },
    { month: "Feb", revenue: 70 },
    { month: "Mar", revenue: 55 },
    { month: "Apr", revenue: 50 },
    { month: "May", revenue: 40 },
    { month: "Jun", revenue: 110 },
    { month: "Jul", revenue: 60 },
    { month: "Aug", revenue: 70 },
    { month: "Sep", revenue: 30 },
    { month: "Oct", revenue: 60 },
    { month: "Nov", revenue: 130 },
    { month: "Dec", revenue: 70 },
  ];

  return (
    <div className="bg-background rounded-xl p-[25px] duration-300 hover:-translate-y-1 hover:shadow-lg">
      <h3 className="mb-6 text-xl text-gray-700">Revenue Report</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid horizontal={false} strokeDasharray="1 1" />
          <XAxis
            dataKey="month"
            axisLine={{ stroke: "#eeeeee", strokeWidth: 1.5 }}
            tickLine={false}
            tick={{ fill: "#888888", fontSize: "14px" }} // for value of x axis line
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#888888", fontSize: "14px" }} // for value of y axis line
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            contentStyle={{
              background: "#ffffff",
              border: "none",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
            labelStyle={{ color: "#374151", fontWeight: "bold" }}
            itemStyle={{ color: "#10b981" }}
            formatter={(value) => [`$${value}`, "Revenue"]}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            fillOpacity={100}
            stroke="#10b981"
            fill="url(#colorRevenue)"
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueReport;
