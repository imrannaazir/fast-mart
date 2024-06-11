import DropdownCategories, {
  TCollectionDropdownItemProps,
} from "@/components/navbar/DropdownCategories";
import SidebarSectionHeader from "./SidebarSectionHeader";

const baseApi = process.env.NEXT_PUBLIC_DB_URL;

const getAllCollections = async () => {
  const res = await fetch(`${baseApi}/collections`);
  if (!res.ok) {
    throw new Error("Failed to fetch categories!");
  }
  const data = await res.json();
  return data?.data;
};

const HomeLeftSideCategoriesBar = async () => {
  const collections = await getAllCollections();
  const collectionsDropdownItems: TCollectionDropdownItemProps[] =
    collections?.map((collection: any) => ({
      id: collection?._id,
      name: collection?.title,
      iconName: collection?.icon?.name || "ban",
      categories: collection?.categories?.map((category: any) => ({
        id: category?._id,
        name: category?.title,
      })),
    }));
  return (
    <div className="p-6 bg-gray-100 rounded-md   space-y-6  sticky top-4">
      <SidebarSectionHeader level="Category" />
      {/* categories */}
      <DropdownCategories
        type="simple"
        collections={collectionsDropdownItems}
      />
    </div>
  );
};

export default HomeLeftSideCategoriesBar;
