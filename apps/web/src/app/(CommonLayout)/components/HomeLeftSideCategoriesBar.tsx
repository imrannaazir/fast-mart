import DropdownCategories, { TCollectionDropdownItemProps } from "@/components/navbar/DropdownCategories";
import SidebarSectionHeader from "./SidebarSectionHeader";

const HomeLeftSideCategoriesBar = ({ collections }: { collections: TCollectionDropdownItemProps[] }) => {
  return (
    <div className="sticky top-4 space-y-6 rounded-md bg-gray-100 p-6">
      <SidebarSectionHeader level="Category" />
      {/* categories */}
      <DropdownCategories type="simple" collections={collections} />
    </div>
  );
};

export default HomeLeftSideCategoriesBar;
