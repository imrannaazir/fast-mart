import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

import {
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

const ProductDataTableToolbar = () => {
  const statuses = [
    {
      value: "in-stock",
      label: "In stock",
      icon: CheckCircledIcon,
    },
    {
      value: "out-of-stock",
      label: "Out of stock",
      icon: QuestionMarkCircledIcon,
    },
  ];
  return (
    <div className="flex items-center justify-between border p-2 rounded-md">
      <div className="flex flex-1 items-center space-x-2">
        <div className="space-y-2 w-full">
          {/* search and sort */}
          <div className="flex items-center justify-between w-full">
            <Input
              placeholder="Filter product..."
              value={""}
              onChange={() => {}}
              className="h-8 w-[150px] lg:w-[250px]"
            />
            <Button
              variant="outline"
              size="sm"
              className="ml-auto hidden h-8 lg:flex"
            >
              <MixerHorizontalIcon className="mr-2 h-4 w-4" />
              Sort
            </Button>
          </div>

          {/* filters */}
          <div>
            <DataTableFacetedFilter title="Status" options={statuses} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDataTableToolbar;
