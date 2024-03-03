import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteProductByIdMutation } from "@/redux/features/product/productApi";
import { TProduct } from "@/types/product";
import { Row } from "@tanstack/react-table";
import { Copy, Eye, FilePen, MoreHorizontal, Trash2 } from "lucide-react";
import { toast } from "sonner";

type DataTableAction = {
  row: Row<TProduct>;
};

function DataTableAction({ row }: DataTableAction) {
  // rtk query api hook
  const [deleteProductById] = useDeleteProductByIdMutation();

  const product = row.original;

  const onDelete = async () => {
    try {
      console.log(product._id);
    } catch (error) {
      toast.error("Failed to delete the product.", { duration: 2000 });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="flex items-center gap-2">
          <Eye size={14} /> View
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onDelete}
          className="flex items-center gap-2"
        >
          <Trash2 size={14} /> Delete
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2">
          <Copy size={14} /> Duplicate
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2">
          <FilePen size={14} /> Edit
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DataTableAction;
