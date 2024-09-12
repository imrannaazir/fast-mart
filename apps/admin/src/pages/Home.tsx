import { cn } from "@/lib/utils";
import { IconType } from "react-icons/lib";
import { Fragment } from "react/jsx-runtime";
import { hexToRgba } from "@repo/utils/functions";
import { cartCards } from "@/constant/constant";

type TChartCard = {
  id: number;
  title: string;
  number: string;
  icon: IconType;
  color: string;
};

const HomePage = () => {
  // cart cards data

  return (
    <Fragment>
      {/* cart cards section */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cartCards?.map((card) => <ChartCard data={card} key={card?.id} />)}
      </section>
    </Fragment>
  );
};

export default HomePage;

//  chart card component
const ChartCard = ({ data }: { data: TChartCard }) => {
  return (
    <div className="bg-background rounded-xl p-6 duration-300 hover:-translate-y-1 hover:shadow-sm">
      {/* body */}
      <div
        className={cn(`flex items-center justify-between border-l-[3.5px] pl-4`)}
        style={{
          borderColor: data?.color,
        }}
      >
        {/* content */}
        <div>
          <p className="text-gray-400">{data?.title}</p>
          <h1 className="text-[26px] font-semibold text-gray-700">{data?.number}</h1>
        </div>
        {/* icon */}
        <div
          className="rounded-md p-2"
          style={{
            backgroundColor: hexToRgba(data?.color, 0.1),
          }}
        >
          <data.icon size={24} style={{ color: data?.color }} />
        </div>
      </div>
    </div>
  );
};
