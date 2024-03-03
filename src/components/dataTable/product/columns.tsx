import { Badge } from "@/components/ui/badge";
import { TProduct } from "@/types/product";
import { ColumnDef } from "@tanstack/react-table";
import { Image } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import DataTableAction from "./data-table-action";

export const columns: ColumnDef<TProduct>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
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
  {
    accessorKey: "name",
    header: "Product",
    cell: ({ row }) => {
      const productName = row.getValue("name") as string;
      const productImage = row.original?.image || "";
      return (
        <div className="flex gap-2 items-center">
          {productImage ? (
            <div>
              <img className="w-8 h-8" src={productImage as string} alt="" />
            </div>
          ) : (
            <Image />
          )}
          <p>{productName}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <div className="flex justify-center">
          {" "}
          <Badge variant={status === "in-stock" ? "default" : "destructive"}>
            {status}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formattedPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return <div className="font-semibold">{formattedPrice}</div>;
    },
  },
  {
    accessorKey: "quantity",
    header: "Inventory",
  },
  {
    accessorKey: "category.name",
    header: "Category",
  },
  {
    accessorKey: "brand.name",
    header: "Brand",
  },

  // table action
  {
    id: "actions",
    cell: ({ row }) => {
      return <DataTableAction row={row} />;
    },
  },
];
