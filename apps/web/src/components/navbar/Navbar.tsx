import { FaWhatsapp } from "react-icons/fa";
import NavCategories from "./NavCategories";
import NavigationLinks from "./NavigationLinks";
import { Suspense } from "react";
import { TCollectionDropdownItemProps } from "./DropdownCategories";
import { collections } from "@/constants/db";
/* const baseApi = process.env.NEXT_PUBLIC_DB_URL;

const getAllCollections = async () => {
  const res = await fetch(`${baseApi}/collections`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch categories!");
  }
  const data = await res.json();
  return data?.data;
}; */
const Navbar = async () => {
  // const collections = await getAllCollections();
  const collectionsDropdownItems: TCollectionDropdownItemProps[] = collections?.map((collection: any) => ({
    id: collection?._id,
    name: collection?.title,
    iconName: collection?.icon?.name || "ban",
    categories: collection?.categories?.map((category: any) => ({
      id: category?._id,
      name: category?.title,
    })),
  }));

  return (
    <div className="hidden items-center justify-between lg:flex">
      <div className="flex items-center gap-4">
        <NavCategories collections={collectionsDropdownItems} />
        <Suspense fallback={<div>Loading...</div>}>
          <NavigationLinks />
        </Suspense>
      </div>
      <div className="flex items-center gap-1">
        <FaWhatsapp size={40} className="text-primary" />
        <div>
          <h3 className="text-sm font-semibold">CALL ANYTIME</h3>
          <h2 className="text-primary text-lg font-bold">280 355 211</h2>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
