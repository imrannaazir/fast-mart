"use client";
import { cn } from "@/libs/utils";
import Link from "next/link";
import { FC } from "react";
import DropdownCategoryItem from "./DropdownCategoryItem";
export type TCollectionDropdownItemProps = {
  id: string;
  name: string;
  iconName?: string;
  categories?: TCollectionDropdownItemProps[];
};
type TDropDownCategoriesProps = {
  type?: "mega" | "simple";
  collections: TCollectionDropdownItemProps[];
};
const DropdownCategories: FC<TDropDownCategoriesProps> = ({ type = "mega", collections }) => {
  return (
    <div className="w-[300px] space-y-4">
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
                ? "absolute -right-[400px] top-0 hidden h-full min-w-full opacity-0 transition-all duration-300 group-hover:-right-[300px] group-hover:block group-hover:opacity-100"
                : "hidden"
            )}
          >
            <div
              className={cn(
                type === "mega" ? "bg-background ml-9 h-fit w-full rounded-md px-4 py-5 shadow-lg" : "hidden"
              )}
            >
              <h3 className="text-base font-semibold">{collection?.name}</h3>
              <ul className="mt-3 list-disc space-y-2 pl-4 text-base">
                {collection?.categories?.map((category) => (
                  <li key={category?.id}>
                    <Link
                      className="hover:text-primary"
                      href={`search?collections=${collection?.id}&categories=${category?.id}`}
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
