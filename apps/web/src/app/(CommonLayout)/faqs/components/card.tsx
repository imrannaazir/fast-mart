import { LucideIcon } from "lucide-react";

export type TCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
};
const Card = ({ feature, index }: { feature: TCardProps; index: number }) => {
  return (
    <div
      key={index}
      className="flex flex-col items-center rounded-lg bg-gray-100 p-6 text-center transition-colors hover:bg-gray-50"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center text-teal-500">
        <feature.icon className="h-8 w-8" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-gray-900">{feature.title}</h3>
      <p className="text-sm text-gray-600">{feature.description}</p>
    </div>
  );
};

export default Card;
