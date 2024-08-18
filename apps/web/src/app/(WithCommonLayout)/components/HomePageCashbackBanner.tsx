const HomePageCashbackBanner = () => {
  return (
    <div
      style={{
        backgroundImage: `url("/backgrounds/cashback.jpg")`,
      }}
      className="   text-background text-center flex items-center justify-center flex-col gap-3 py-6 rounded-md "
    >
      <h3 className="text-3xl font-bold">Get $3 Cashback! Min Order of $30</h3>
      <p className="p-2 border-background border border-dashed">
        Use Code : GROCERY1920
      </p>
    </div>
  );
};

export default HomePageCashbackBanner;
