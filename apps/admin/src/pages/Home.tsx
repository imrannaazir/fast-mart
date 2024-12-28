import ChartCard from "@/components/dashboard/chart-card";
import { CustomerInsights } from "@/components/dashboard/customer-insights";
import DashboardHeader from "@/components/dashboard/dashbaord-header";
import DashboardCategory from "@/components/dashboard/dashboard-category";
import { RecentOrders } from "@/components/dashboard/recent-orders";
import { RevenueReport } from "@/components/dashboard/revenue-report";
import { TopProducts } from "@/components/dashboard/top-products";
import { cartCards } from "@/constant/constant";

const HomePage = () => {
  return (
    <div className="space-y-6 py-8">
      {/* Header */}
      <DashboardHeader />

      {/* Stats Cards */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {cartCards?.map((card) => <ChartCard data={card} key={card?.id} />)}
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
