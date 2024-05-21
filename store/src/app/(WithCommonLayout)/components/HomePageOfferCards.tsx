import AppCard from "@/components/ui/AppCard";
import { offerCards } from "../../../../constant/global.content";

const HomePageOfferCards = () => {
  return (
    <div className=" w-full grid  md:grid-cols-2 gap-6 mt-6">
      {offerCards.map((card) => (
        <AppCard
          cover={card}
          key={card.id}
          variant="primary"
          className="min-h-[160px]"
          size="sm"
        />
      ))}
    </div>
  );
};

export default HomePageOfferCards;
