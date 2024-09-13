import { cn } from "@/lib/utils";
import { hexToRgba } from "@repo/utils/functions";
import { IconType } from "react-icons/lib";

export type TChartCard = {
  id: number;
  title: string;
  number: string;
  icon: IconType;
  color: string;
};

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

export default ChartCard;
