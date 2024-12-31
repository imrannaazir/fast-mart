import ChartCard, { TChartCard } from "@/components/dashboard/chart-card";
import { CustomerInsights } from "@/components/dashboard/customer-insights";
import DashboardHeader from "@/components/dashboard/dashbaord-header";
import DashboardCategory from "@/components/dashboard/dashboard-category";
import { RecentOrders } from "@/components/dashboard/recent-orders";
import { RevenueReport } from "@/components/dashboard/revenue-report";
import { TopProducts } from "@/components/dashboard/top-products";
import { formatCurrency } from "@/lib/utils";
import { useGetDashboardInsightsQuery } from "@/redux/features/dashboard/dashboard-api";
import { TDashboardInsights } from "@repo/utils/types";
import { FiShoppingBag, FiUsers } from "react-icons/fi";
import { GoDatabase } from "react-icons/go";
import { IoPricetagsOutline } from "react-icons/io5";

const HomePage = () => {
  const { data, isFetching } = useGetDashboardInsightsQuery("");
  const dashboardInsights = data?.data as TDashboardInsights;
  const cartCards: TChartCard[] = [
    {
      id: 1,
      title: "Total Revenue",
      number: formatCurrency(dashboardInsights?.totalRevenue),
      icon: GoDatabase,
      color: "#0da487",
    },
    {
      id: 2,
      title: "Total Orders",
      number: dashboardInsights?.totalOrders.toString(),
      icon: FiShoppingBag,
      color: "#757cc6",
    },
    {
      id: 3,
      title: "Total Products",
      number: dashboardInsights?.totalProducts.toString(),
      icon: IoPricetagsOutline,
      color: "#ef3e3f",
    },
    {
      id: 4,
      title: "Total Customers",
      number: dashboardInsights?.totalCustomers.toString(),
      icon: FiUsers,
      color: "#9e65c2",
    },
  ];
  return (
    <div className="space-y-6 py-8">
      {/* Header */}
      <DashboardHeader />

      {/* Stats Cards */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {cartCards?.map((card) => <ChartCard data={card} key={card?.id} isLoading={isFetching} />)}
      </section>

      {/* Categories */}
      <DashboardCategory />

      <div className=" ">
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <RevenueReport />
          <TopProducts />
          <RecentOrders />
          <CustomerInsights />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
