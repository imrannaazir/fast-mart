import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";

import {
  addStatus,
  clearStatus,
  removeStatus,
  selectFilteredStatus,
  updateSearchTerm,
} from "@/redux/features/filter/filterSlice";
import DateTableSort from "./data-table-sort";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import debounce from "@/lib/debounce";
import { ChangeEvent, FC } from "react";
import { TLabelValuePair } from "@/types";

type TImageDataTableToolbar = {
  sortByItems: TLabelValuePair[];
  filterByStatuses?: TLabelValuePair[];
};

const ImageDataTableToolbar: FC<TImageDataTableToolbar> = ({
  sortByItems,
  filterByStatuses,
}) => {
  //invoked hooks
  const dispatch = useAppDispatch();
  const selectedStatus = useAppSelector(selectFilteredStatus);

  const onSetSearchTerm = (...args: unknown[]) => {
    const searchTerm = (args[0] as ChangeEvent<HTMLInputElement>).target.value;
    dispatch(updateSearchTerm(searchTerm));
  };

  const debouncedSearchTerm = debounce(onSetSearchTerm, 1000);

  return (
    <div className="flex items-center justify-between border p-2 rounded-md">
      <div className="flex flex-1 items-center space-x-2">
        <div className="space-y-2 w-full">
          {/* filters */}
          <div className="flex justify-between items-center space-x-2">
            {/* search  */}
            <div className="  flex-grow">
              <form>
                <div className="relative">
                  <Input
                    className="pl-8 h-9"
                    placeholder="Search"
                    onChange={debouncedSearchTerm}
                  />
                  <Search className="absolute left-2 top-2.5 w-4 h-4 text-muted-foreground" />
                </div>
              </form>
            </div>
            <DateTableSort sortByItems={sortByItems} />
          </div>
          {filterByStatuses && (
            <DataTableFacetedFilter
              selectedValues={selectedStatus}
              clearFilter={clearStatus}
              addFilter={addStatus}
              removeFilter={removeStatus}
              title="Status"
              options={sortByItems}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageDataTableToolbar;
