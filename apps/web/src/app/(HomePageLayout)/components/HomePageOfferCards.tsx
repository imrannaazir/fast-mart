import AppCard from "@/components/ui/AppCard";
import { offerCards } from "@/constants/global.content";

const HomePageOfferCards = () => {
  return (
    <div className="mt-6 grid w-full gap-6 md:grid-cols-2">
      {offerCards.map((card) => (
        <AppCard cover={card} key={card.id} variant="primary" className="min-h-[160px]" size="sm" />
      ))}
    </div>
  );
};

export default HomePageOfferCards;
