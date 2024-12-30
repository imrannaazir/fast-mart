import { hexToRgba } from "@repo/utils/functions";
import { IconType } from "react-icons/lib";

export type TChartCard = {
  id: number;
  title: string;
  number: string;
  icon: IconType;
  color: string;
};

const ChartCard = ({ data, isLoading }: { data: TChartCard; isLoading: boolean }) => {
  return (
    <div className="bg-card relative overflow-hidden rounded-xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          {/* Icon */}
          <div
            className="rounded-lg p-3"
            style={{
              backgroundColor: hexToRgba(data?.color, 0.1),
            }}
          >
            <data.icon size={28} style={{ color: data?.color }} />
          </div>

          {/* Indicator line */}
          <div
            className="h-1 w-16 rounded-full"
            style={{
              backgroundColor: hexToRgba(data?.color, 0.2),
            }}
          />
        </div>

        {/* Content */}
        <div className="mt-4">
          <p className="text-muted-foreground text-sm font-medium">{data?.title}</p>
          {isLoading ? (
            <h2 className="bg-muted mt-2 h-9 w-24 animate-pulse rounded-md"></h2>
          ) : (
            <h2 className="mt-2 text-3xl font-bold tracking-tight">{data?.number}</h2>
          )}
        </div>
      </div>

      {/* Background decoration */}
      <div
        className="absolute bottom-0 right-0 h-32 w-32 translate-x-1/4 translate-y-1/4 transform rounded-full opacity-10"
        style={{
          backgroundColor: data?.color,
        }}
      />
    </div>
  );
};

export default ChartCard;
