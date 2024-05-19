import HomePageCashbackBanner from "./HomePageCashbackBanner";
import HomeSectionTop from "./HomeSectionTop";

const BestSellerProductsSection = () => {
  return (
    <section>
      <HomePageCashbackBanner />

      <HomeSectionTop
        heading="Our Best Seller"
        description="A virtual assistant collects the products from your list"
      />
    </section>
  );
};

export default BestSellerProductsSection;
