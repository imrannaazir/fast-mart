import { Fragment } from "react/jsx-runtime";
import { cartCards } from "@/constant/constant";
import ChartCard from "@/components/dashboard/ChartCard";
import DashboardCategory from "@/components/dashboard/DashboardCategory";
import RevenueReport from "@/components/dashboard/RevenueReport";
import BestSellingProducts from "@/components/dashboard/BestSellingProducts";

const HomePage = () => {
  // cart cards data

  return (
    <Fragment>
      {/* cart cards section */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cartCards?.map((card) => <ChartCard data={card} key={card?.id} />)}
      </section>

      {/* categories */}
      <DashboardCategory />

      {/* Revenue report and best selling products */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RevenueReport />
        <BestSellingProducts />
      </div>
    </Fragment>
  );
};

export default HomePage;
