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
    description:
      "Vegetables contain many vitamins and minerals that are good for your health.",
    path: "/",
  },
  {
    id: 2,
    photo: assets.images.banners.nuts,
    topHeader: null,
    offerAmount: "45% Off",
    subHeading: null,
    heading: "Nut Collection",
    description: "We deliver organic vegetables & fruits",
    path: "/",
  },
  {
    id: 3,
    photo: assets.images.banners.fruits,
    topHeader: null,
    offerAmount: "35% Off",
    subHeading: null,
    heading: "Organic Market",
    description: "Start your daily shopping with some Organic food",
    path: "/",
  },
  {
    id: 4,
    photo: assets.images.banners.eggs,
    topHeader: null,
    offerAmount: "5% Off",
    subHeading: null,
    heading: "Hot Deals on New Items",
    description: "Daily Essentials Eggs & Dairy",
    path: "/",
  },
  {
    id: 5,
    photo: assets.images.banners.fresh_fruits,
    topHeader: null,
    offerAmount: "5% Off",
    subHeading: null,
    heading: "Buy More & Save More",
    description: "Fresh Vegetables",
    path: "/",
  },
  {
    id: 6,
    photo: assets.images.banners.meats,
    topHeader: null,
    offerAmount: "5% Off",
    subHeading: null,
    heading: "Organic Meat Prepared",
    description: "Delivered to Your Home",
    path: "/",
  },
  {
    id: 7,
    photo: assets.images.banners.snacks,
    topHeader: null,
    offerAmount: "5% Off",
    subHeading: null,
    heading: "Buy More & Save More",
    description: "Nuts & Snacks",
    path: "/",
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

// juice cover
export const juiceCover: THeroCoverProps = {
  id: 1,
  subHeading: "Get Ready To",
  heading: "TAKE ON THE DAY!",
  description:
    "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate.",
  photo: assets.images.banners.juice,
  path: "",
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
  path: "",
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
  path: "",
  description: "Save up to 5% OFF",
  topHeader: "SUMMER",
};
