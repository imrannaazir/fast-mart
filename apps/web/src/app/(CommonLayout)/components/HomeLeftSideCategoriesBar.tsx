import DropdownCategories, {
  TCollectionDropdownItemProps,
} from "@/components/navbar/DropdownCategories";
import SidebarSectionHeader from "./SidebarSectionHeader";

const HomeLeftSideCategoriesBar = ({
  collections,
}: {
  collections: TCollectionDropdownItemProps[];
}) => {
  return (
    <div className="p-6 bg-gray-100 rounded-md   space-y-6  sticky top-4">
      <SidebarSectionHeader level="Category" />
      {/* categories */}
      <DropdownCategories type="simple" collections={collections} />
    </div>
  );
};

export default HomeLeftSideCategoriesBar;
