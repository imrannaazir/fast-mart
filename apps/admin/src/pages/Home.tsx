import BestSellingProducts from "@/components/dashboard/BestSellingProducts";
import ChartCard from "@/components/dashboard/ChartCard";
import DashboardCategory from "@/components/dashboard/DashboardCategory";
import RevenueReport from "@/components/dashboard/RevenueReport";
import { cartCards } from "@/constant/constant";

const HomePage = () => {
  return (
    <div className="space-y-6 py-8">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back to your dashboard overview.</p>
      </div>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {cartCards?.map((card) => <ChartCard data={card} key={card?.id} />)}
      </section>

      {/* Categories */}
      <DashboardCategory />

      {/* Revenue report and best selling products */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RevenueReport />
        <BestSellingProducts />
      </div>
    </div>
  );
};

export default HomePage;
