import { IconType } from "react-icons";

export type TCard = {
  id: number;
  title: string;
  numbers: number;
  icon: IconType;
};
const Card = ({ cardData }: { cardData: TCard }) => {
  return (
    <div className="bg-background relative rounded-lg p-6">
      <div className="flex items-center gap-4">
        <cardData.icon size={56} className="text-primary" />
        <div>
          <p className="z-50 font-medium text-gray-500">{cardData?.title}</p>
          <h3 className="text-lg font-medium">{cardData?.numbers}</h3>
        </div>
      </div>
    </div>
  );
};

export default Card;
