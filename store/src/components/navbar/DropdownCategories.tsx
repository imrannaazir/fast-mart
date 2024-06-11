import Link from "next/link";
import DropdownCategoryItem from "./DropdownCategoryItem";
import { FC } from "react";
import { cn } from "@/libs/utils";
export type TCollectionDropdownItemProps = {
  id: string;
  name: string;
  iconName?: string;
  categories: TCollectionDropdownItemProps[];
};
type TDropDownCategoriesProps = {
  type?: "mega" | "simple";
  collections: TCollectionDropdownItemProps[];
};
const DropdownCategories: FC<TDropDownCategoriesProps> = ({
  type = "mega",
  collections,
}) => {
  return (
    <div className="space-y-4 w-[300px]  ">
      {collections?.map((collection) => (
        <div key={collection?.id} className="group">
          {/* dropdown of collection list  */}
          <DropdownCategoryItem
            type={type}
            collectionName={collection?.name}
            iconName={collection?.iconName as string}
            id={collection?.id}
          />
          {/* drop down of category list of a single collections*/}
          <div
            className={cn(
              type === "mega"
                ? " min-w-full h-full hidden group-hover:block opacity-0 group-hover:opacity-100   absolute top-0 -right-[400px] group-hover:-right-[300px] transition-all duration-300"
                : "hidden"
            )}
          >
            <div
              className={cn(
                type === "mega"
                  ? " rounded-md shadow-lg   w-full h-full ml-9 bg-background px-4 py-5"
                  : "hidden"
              )}
            >
              <h3 className="text-base font-semibold">{collection?.name}</h3>
              <ul className="list-disc pl-4 text-base mt-3 space-y-2">
                {collection?.categories?.map((category) => (
                  <li key={category?.id}>
                    <Link
                      className="hover:text-primary"
                      href={`category/${category?.id}`}
                    >
                      {category?.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DropdownCategories;
