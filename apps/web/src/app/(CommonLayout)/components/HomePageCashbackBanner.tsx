const HomePageCashbackBanner = () => {
  return (
    <div
      style={{
        backgroundImage: `url("/backgrounds/cashback.jpg")`,
      }}
      className="text-background flex flex-col items-center justify-center gap-3 rounded-md py-6 text-center"
    >
      <h3 className="text-3xl font-bold">Get $3 Cashback! Min Order of $30</h3>
      <p className="border-background border border-dashed p-2">Use Code : GROCERY1920</p>
    </div>
  );
};

export default HomePageCashbackBanner;
