import { Badge } from "@/components/ui/badge";
import { TProduct } from "@/types/product";
import { ColumnDef } from "@tanstack/react-table";
import { Image } from "lucide-react";

export const columns: ColumnDef<TProduct>[] = [
  {
    accessorKey: "name",
    header: "Product",
    cell: ({ row }) => {
      const productName = row.getValue("name") as string;
      const productImage = row.getValue("image");
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
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge variant={status === "in-stock" ? "default" : "destructive"}>
          {status}
        </Badge>
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
];
