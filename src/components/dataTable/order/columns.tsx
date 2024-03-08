import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { TOrder } from "@/types/order.type";

export const columns: ColumnDef<TOrder>[] = [
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
    accessorKey: "_id",
    header: "Order ID",
    cell: ({ row }) => {
      const orderId = row.getValue("_id");

      return <div className="font-semibold">{`# ${orderId}`}</div>;
    },
  },
  {
    accessorKey: "buyer_name",
    header: "Customer name",
  },
  {
    accessorKey: "product.name",
    header: "Product Name",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },

  {
    accessorKey: "totalCost",
    header: "Total",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("totalCost"));
      const formattedPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return <div className="font-semibold">{formattedPrice}</div>;
    },
  },
];
