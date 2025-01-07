import DropdownCategories from "@/components/navbar/DropdownCategories";
import NavigationLinkItem from "@/components/navbar/NavigationLinkItem";
import { TCollection } from "@repo/utils/types";
import { Divider } from "antd";
import SidebarSectionHeader from "./SidebarSectionHeader";

const HomeLeftSideCategoriesBar = ({ collections }: { collections: TCollection[] }) => {
  return (
    <div className="sticky top-4 space-y-6 rounded-md bg-gray-100 p-6">
      <SidebarSectionHeader level="Category" />
      {/* categories */}
      <DropdownCategories type="simple" collections={collections} />
      <Divider variant="dashed" className="border-[1.5px] border-gray-400" />
      {["Value of the day", "Top 50 Offers", "New Arrivals"]?.map((item) => (
        <NavigationLinkItem link={{ id: item, label: item, path: "/#" }}></NavigationLinkItem>
      ))}
    </div>
  );
};

export default HomeLeftSideCategoriesBar;
