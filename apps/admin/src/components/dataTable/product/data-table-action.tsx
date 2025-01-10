import { BiEdit } from "react-icons/bi";
import { IoTrashOutline } from "react-icons/io5";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { setIsLoading, setIsOpen, setOnConfirm } from "@/redux/features/modal/alertModal.slice";
import { useDeleteProductByIdMutation } from "@/redux/features/product/productApi";
import { useAppDispatch } from "@/redux/hooks";
import { TProduct } from "@repo/utils/types";
import { Row } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { FaEllipsis } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ProductDataTableAction = ({ row }: { row: Row<TProduct> }) => {
  const [deleteSingleProduct] = useDeleteProductByIdMutation();
  const productId = row.original._id;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // on confirm
  const onConfirm = async () => {
    dispatch(setIsLoading(true));
    try {
      const res = await deleteSingleProduct(productId).unwrap();
      if (res.success) {
        toast.success("Deleted successfully.", { duration: 2000 });
        dispatch(setIsOpen(false));
        dispatch(setIsLoading(false));
      }
    } catch (error) {
      toast.error(`Failed to delete.`, { duration: 2000 });

      dispatch(setIsOpen(false));
      dispatch(setIsLoading(false));
    }
  };
  // on update
  const onUpdate = () => {
    navigate(`/products/${productId}`);
  };

  // on delete
  const onDelete = () => {
    dispatch(setOnConfirm(onConfirm));
    dispatch(setIsOpen(true));
  };
  const collectionActions = [
    {
      title: "Edit Product",
      icon: <BiEdit className="mr-2 h-4 w-4" />,
      fn: onUpdate,
    },
    {
      title: "Delete Product",
      icon: <IoTrashOutline className="mr-2 h-4 w-4" />,
      fn: onDelete,
      className: "text-red-500",
    },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="relative" size={"icon"}>
          <FaEllipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="absolute -right-5 w-[200px]">
        <DropdownMenuGroup>
          <a target="_blank" href={`${import.meta.env.VITE_APP_STORE_FRONT_URL}/products/${productId}`}>
            <DropdownMenuItem className={cn("cursor-pointer")}>
              <Eye className="mr-2 h-4 w-4" />
              <span>Preview</span>
            </DropdownMenuItem>
          </a>
          {collectionActions.map((action, i) => (
            <DropdownMenuItem key={i} onClick={action.fn} className={cn("cursor-pointer", action.className)}>
              {action.icon}
              <span>{action.title}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProductDataTableAction;
