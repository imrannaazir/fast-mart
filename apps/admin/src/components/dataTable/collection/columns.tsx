import { Checkbox } from "@/components/ui/checkbox";
import Icon from "@/components/ui/lucide-icon";
import { TCollection } from "@repo/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { Link } from "react-router-dom";
import CollectionDataTableAction from "./data-table-action";

export const columns: ColumnDef<TCollection>[] = [
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
    header: "Title",
    cell: ({ row }) => {
      const title = row.original.title;
      // const format = row?.original?.image?.url;
      const imageUrl =
        row.original?.image?.url || "https://i.pinimg.com/564x/0c/bb/aa/0cbbaab0deff7f188a7762d9569bf1b3.jpg";
      return (
        <div className="mr-6 flex items-center justify-start gap-2 lg:mr-0">
          <img className="h-10 w-10 rounded-md border-2 border-gray-100 object-cover" src={imageUrl} alt="" />
          <div>
            <Link to={`/contents/collections/${row?.original?._id}`} className="font-semibold text-gray-700">
              {title}
            </Link>
          </div>
        </div>
      );
    },
  },
  {
    header: "Icon",
    cell: ({ row }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const iconName: any = row?.original?.icon || "Ban";
      return <Icon className="h-4 w-4 text-gray-600" name={iconName} />;
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
      return <CollectionDataTableAction row={row} />;
    },
  },
];
