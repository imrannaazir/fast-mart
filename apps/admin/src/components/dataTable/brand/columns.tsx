import { Checkbox } from "@/components/ui/checkbox";
import { TBrand } from "@repo/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import BrandDataTableAction from "./data-table-action";

export const columns: ColumnDef<TBrand>[] = [
  // select column
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // image url column

  {
    header: "Name",
    cell: ({ row }) => {
      const name = row.original.name;
      // const format = row?.original?.image?.url;
      const imageUrl =
        row.original?.logo?.url || "https://i.pinimg.com/564x/0c/bb/aa/0cbbaab0deff7f188a7762d9569bf1b3.jpg";
      return (
        <div className="flex items-center justify-start gap-2">
          <img className="h-10 w-10 rounded-md border-2 border-gray-100 object-cover" src={imageUrl} alt="" />
          <div>
            <p className="font-semibold text-gray-700">{name}</p>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: "Date Added",
    cell: ({ row }) => {
      const date = row.original.createdAt;
      const now = moment(date).format("MMMM Do YYYY");
      return <p>{now}</p>;
    },
  },
  {
    header: "Products",
    accessorKey: "noOfProducts",
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => {
      return <BrandDataTableAction row={row} />;
    },
  },
];
