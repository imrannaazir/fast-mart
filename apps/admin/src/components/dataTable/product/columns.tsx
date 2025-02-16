import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { TBrand, TCategory, TCollection, TImage, TProduct, TProductStatus } from "@repo/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { Link } from "react-router-dom";
import ProductDataTableAction from "./data-table-action";

export const columns: ColumnDef<TProduct>[] = [
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
        (row.original?.media?.[0] as TImage)?.url ||
        "https://i.pinimg.com/564x/0c/bb/aa/0cbbaab0deff7f188a7762d9569bf1b3.jpg";
      return (
        <div className="mr-6 flex items-center justify-start gap-2 lg:mr-0">
          <img className="h-10 w-10 rounded-md border-2 border-gray-100 object-cover" src={imageUrl} alt="" />
          <div>
            <Link to={`/products/${row?.original?._id}`} className="font-semibold text-gray-700">
              {title}
            </Link>
          </div>
        </div>
      );
    },
  },

  {
    header: "Status",
    cell: ({ row }) => {
      const status: TProductStatus = row.original.status;
      return (
        <Badge variant={status === "ARCHIVED" ? "destructive" : status === "DRAFT" ? "pending" : "success"}>
          {status}
        </Badge>
      );
    },
  },
  {
    header: "Inventory",
    cell: ({ row }) => {
      const quantity = row.original.quantity;
      return <p className={cn(quantity === 0 ? "text-destructive" : "text-foreground")}>{quantity} in stock</p>;
    },
  },

  {
    header: "Collection",
    cell: ({ row }) => {
      const collectionName = (row.original.collections?.[0] as TCollection)?.title || "N/A";
      return <p>{collectionName}</p>;
    },
  },
  {
    header: "Category",
    cell: ({ row }) => {
      const collectionName = (row.original.categories?.[0] as TCategory)?.title || "N/A";
      return <p>{collectionName}</p>;
    },
  },
  {
    header: "Brand",
    cell: ({ row }) => {
      const collectionName = (row.original?.brand as TBrand)?.name || "N/A";
      return <p>{collectionName}</p>;
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
    id: "action",
    header: "Action",
    cell: ({ row }) => {
      return <ProductDataTableAction row={row} />;
    },
  },
];
