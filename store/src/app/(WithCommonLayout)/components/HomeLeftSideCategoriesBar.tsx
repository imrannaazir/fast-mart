import DropdownCategories from "@/components/navbar/DropdownCategories";

const HomeLeftSideCategoriesBar = () => {
  return (
    <div className="p-6 bg-gray-100 rounded-md   space-y-6  sticky top-4">
      <h3 className="flex flex-col">
        <span className="text-xl font-semibold">Category</span>
        <span className="h-[2px] w-[65px] bg-primary" />
      </h3>

      {/* categories */}
      <DropdownCategories type="simple" />
    </div>
  );
};

export default HomeLeftSideCategoriesBar;
