import assets from "@/assets";
import { THeroCoverProps } from "@/types";

export const heroCovers: THeroCoverProps[] = [
  {
    id: 1,
    photo: assets.images.banners.vegetables,
    topHeader: "Exclusive offer",
    offerAmount: "30% Off",
    subHeading: "STAY HOME & DELIVERED YOUR",
    heading: "DAILY NEEDS",
    description: "Vegetables contain many vitamins and minerals that are good for your health.",
    path: "/search",
  },
  {
    id: 2,
    photo: assets.images.banners.nuts,
    topHeader: null,
    offerAmount: "45% Off",
    subHeading: null,
    heading: "Nut Collection",
    description: "We deliver organic vegetables & fruits",
    path: "/search?collections=677c0032e84c38fabe82cfc1",
  },
  {
    id: 3,
    photo: assets.images.banners.fruits,
    topHeader: null,
    offerAmount: "35% Off",
    subHeading: null,
    heading: "Organic Market",
    description: "Start your daily shopping with some Organic food",
    path: "/search?collections=677bd86ae84c38fabe82cf4c",
  },
  {
    id: 4,
    photo: assets.images.banners.eggs,
    topHeader: null,
    offerAmount: "5% Off",
    subHeading: null,
    heading: "Hot Deals on New Items",
    description: "Daily Essentials Eggs & Dairy",
    path: "/search?collections=677c879f6b354a14eff0d85e&",
  },
  {
    id: 5,
    photo: assets.images.banners.fresh_fruits,
    topHeader: null,
    offerAmount: "5% Off",
    subHeading: null,
    heading: "Buy More & Save More",
    description: "Fresh Vegetables",
    path: "/search?collections=677bd86ae84c38fabe82cf4c",
  },
  {
    id: 6,
    photo: assets.images.banners.meats,
    topHeader: null,
    offerAmount: "5% Off",
    subHeading: null,
    heading: "Organic Meat Prepared",
    description: "Delivered to Your Home",
    path: "/search?collections=677bda6be84c38fabe82cf68",
  },
  {
    id: 7,
    photo: assets.images.banners.snacks,
    topHeader: null,
    offerAmount: "5% Off",
    subHeading: null,
    heading: "Buy More & Save More",
    description: "Nuts & Snacks",
    path: "/search?collections=677c0032e84c38fabe82cfc1",
  },
];

export const offerCards = [
  {
    id: 1,
    photo: assets.images.banners.chicken,
    topHeader: null,
    offerAmount: "50% offer",
    subHeading: null,
    heading: "Fresh MEAT",
    description: null,
    path: "/search?collections=677bda6be84c38fabe82cf68",
  },
  {
    id: 1,
    photo: assets.images.banners.mushrooms,
    topHeader: null,
    offerAmount: "50% offer",
    subHeading: null,
    heading: "Testy Mushrooms",
    description: null,
    path: "/search?collections=677bd86ae84c38fabe82cf4c",
  },
];

// juice cover
export const juiceCover: THeroCoverProps = {
  id: 1,
  subHeading: "Get Ready To",
  heading: "TAKE ON THE DAY!",
  description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate.",
  photo: assets.images.banners.juice,
  path: "/search?collections=677bd9bde84c38fabe82cf60",
  offerAmount: null,
  topHeader: null,
};

// drinks cover
export const drinksCover: THeroCoverProps = {
  id: 2,
  subHeading: "SUMMARY",
  heading: "Products",
  offerAmount: "20% Off",
  photo: assets.images.banners.drinks,
  path: "/search?collections=677bd9bde84c38fabe82cf60",
  description: null,
  topHeader: null,
};

// summer vegetables
export const summerVegetablesCover: THeroCoverProps = {
  id: 3,
  subHeading: null,
  heading: "VEGETABLE",
  offerAmount: null,
  photo: assets.images.banners.summer_vegetable,
  path: "/search?collections=677bd86ae84c38fabe82cf4c",
  description: "Save up to 5% OFF",
  topHeader: "SUMMER",
};
