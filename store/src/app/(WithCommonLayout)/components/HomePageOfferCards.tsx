import assets from "@/assets";
import AppCard from "@/components/ui/AppCard";

const HomePageOfferCards = () => {
  const cards = [
    {
      id: 1,
      photo: assets.images.banners.chicken,
      topHeader: null,
      offerAmount: "50% offer",
      subHeading: null,
      heading: "Fresh MEAT",
      description: null,
      path: "/",
    },
    {
      id: 1,
      photo: assets.images.banners.mushrooms,
      topHeader: null,
      offerAmount: "50% offer",
      subHeading: null,
      heading: "Testy Mushrooms",
      description: null,
      path: "/",
    },
  ];
  return (
    <div className=" w-full grid grid-cols-2 gap-6 mt-6">
      {cards.map((card) => (
        <AppCard
          cover={card}
          key={card.id}
          variant="primary"
          className="h-auto"
          size="sm"
        />
      ))}
    </div>
  );
};

export default HomePageOfferCards;
