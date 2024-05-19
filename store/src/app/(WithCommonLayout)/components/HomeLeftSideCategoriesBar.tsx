import DropdownCategories from "@/components/navbar/DropdownCategories";
import SidebarSectionHeader from "./SidebarSectionHeader";

const HomeLeftSideCategoriesBar = () => {
  return (
    <div className="p-6 bg-gray-100 rounded-md   space-y-6  sticky top-4">
      <SidebarSectionHeader level="Category" />
      {/* categories */}
      <DropdownCategories type="simple" />
    </div>
  );
};

export default HomeLeftSideCategoriesBar;
