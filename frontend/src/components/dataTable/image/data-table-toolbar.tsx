import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { DataTableFacetedFilter } from "../product/data-table-faceted-filter";
import {
  CheckCircledIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";
import {
  addStatus,
  clearStatus,
  removeStatus,
  selectFilteredStatus,
} from "@/redux/features/filter/filterSlice";
import DateTableSort from "../data-table-sort";

const ImageDataTableToolbar = () => {
  //invoked hooks
  const dispatch = useAppDispatch();

  const selectedStatus = useAppSelector(selectFilteredStatus);
  const sortByItems = [
    {
      value: "createdAt",
      label: "Date",
    },
    {
      value: "file_name",
      label: "File name",
    },
    {
      value: "size",
      label: "File size",
    },
  ];
  // redux store data

  return (
    <div className="flex items-center justify-between border p-2 rounded-md">
      <div className="flex flex-1 items-center space-x-2">
        <div className="space-y-2 w-full">
          {/* filters */}
          <div className="flex justify-between space-x-2">
            <DataTableFacetedFilter
              selectedValues={selectedStatus}
              clearFilter={clearStatus}
              addFilter={addStatus}
              removeFilter={removeStatus}
              title="Status"
              options={sortByItems}
            />
            <DateTableSort sortByItems={sortByItems} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageDataTableToolbar;
