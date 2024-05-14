import AppCard from "@/components/ui/AppCard";

const HomePageHero = () => {
  return (
    <div className="grid grid-cols-3 gap-4 mt-10">
      {Array.from({ length: 6 }).map((_item, i) => (
        <AppCard className={i === 0 && "col-span-2 row-span-2"} key={i} />
      ))}
    </div>
  );
};

export default HomePageHero;
