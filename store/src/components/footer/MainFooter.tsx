import Link from "next/link";
import CompanyDescription from "./CompanyDescription";
import FooterContactUs from "./FooterContactUs";
import AppLinkButton from "../ui/AppLinkButton";

const baseApi = process.env.NEXT_PUBLIC_DB_URL;

const getAllCollections = async () => {
  const res = await fetch(`${baseApi}/collections`);
  if (!res.ok) {
    throw new Error("Failed to fetch categories!");
  }
  const data = await res.json();
  return data?.data;
};

const MainFooter = async () => {
  const collections = await getAllCollections();
  const collectionLinks = collections?.map((collection: any) => ({
    id: collection?._id,
    label: collection?.title,
    path: `/collection/${collection?._id}`,
  }));
  const footerLinks = [
    {
      id: 1,
      label: "Categories",
      children: collectionLinks,
    },
    {
      id: 2,
      label: "Useful Links",
      children: [
        {
          id: 1,
          label: "Home",
          path: "/",
        },
        {
          id: 2,
          label: "Brands",
          path: "/brands",
        },
        {
          id: "Truck Order",
          label: "Groceries",
          path: "/truck-order",
        },
        {
          id: 4,
          label: "Beverages",
          path: "/beverages",
        },
        {
          id: 5,
          label: "About Us",
          path: "/about-us",
        },
      ],
    },
    {
      id: 3,
      label: "Help Center",
      children: [
        {
          id: 1,
          label: "Your Order",
          path: "/your-order",
        },
        {
          id: 2,
          label: "Your Account",
          path: "/your-account",
        },
        {
          id: 3,
          label: "Track Order",
          path: "/truck-order",
        },
        {
          id: 4,
          label: "Your Wishlist",
          path: "/wishlist",
        },
        {
          id: 5,
          label: "Search",
          path: "/search",
        },
        {
          id: 6,
          label: "FAQ",
          path: "/faqs",
        },
      ],
    },
  ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 py-4 gap-6 lg:gap-0">
      <CompanyDescription />
      {footerLinks.map((group) => (
        <div key={group.id}>
          <h3 className="text-xl font-semibold text-foreground/90">
            {group.label}
          </h3>
          <div className="flex flex-col mt-4 gap-4">
            {group.children.map((link: any) => (
              <Link
                key={link.id}
                href={link.path}
                className="text-foreground/90 hover:text-primary transition-all duration-300 group flex  items-center    "
              >
                <div className="w-0 h-0 group-hover:w-1  group-hover:h-1 rounded-full transition-all duration-300 bg-primary " />
                <AppLinkButton className="group-hover:ml-2 transition-all duration-300">
                  {link.label}
                </AppLinkButton>
              </Link>
            ))}
          </div>
        </div>
      ))}
      <FooterContactUs />
    </div>
  );
};

export default MainFooter;
