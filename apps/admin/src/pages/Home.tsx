import { Fragment } from "react/jsx-runtime";
import { cartCards } from "@/constant/constant";
import ChartCard from "@/components/dashboard/ChartCard";
import DashboardCategory from "@/components/dashboard/DashboardCategory";

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
    </Fragment>
  );
};

export default HomePage;
