/* eslint-disable @typescript-eslint/no-explicit-any */
import SellProductForm from "@/components/forms/sellTheProductForm";
import AlertModal from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Modal from "@/components/ui/modal";
import { addToCart, selectCartItems } from "@/redux/features/cart/cartSlice";
import {
  onClose,
  onOpen,
  selectCollectionName,
  selectIsOpen,
} from "@/redux/features/modal/modalSlice";
import { useDeleteProductByIdMutation } from "@/redux/features/product/productApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TProduct } from "@/types/product.type";
import { Row } from "@tanstack/react-table";
import {
  DollarSign,
  FilePen,
  MoreHorizontal,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type DataTableAction = {
  row: Row<TProduct>;
};

function DataTableAction({ row }: DataTableAction) {
  // local state
  const [isOpen, setIsOpen] = useState(false);
  const isModalOpen = useAppSelector(selectIsOpen);
  const selectedProduct = useAppSelector(selectCollectionName) as TProduct;
  const cartItems = useAppSelector(selectCartItems);

  // invoked hooks
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // rtk query api hook
  const [deleteProductById, { isLoading }] = useDeleteProductByIdMutation();

  const product = row.original;

  const onDelete = async () => {
    try {
      const response: any = await deleteProductById(product._id);
      if (response?.data?.success) {
        setIsOpen(false);
        toast.success("Product deleted successfully.", { duration: 2000 });
      }
    } catch (error) {
      toast.error("Failed to delete the product.", { duration: 2000 });
    }
  };

  // check isAlreadyAddedToCart
  const isAlreadyAddedToCart = cartItems.find(
    (item) => item._id === product._id
  );

  const onAddToCart = () => {
    dispatch(
      addToCart({ _id: product._id, price: product.price, quantity: 1 })
    );
    toast.success("Added to the cart.", { duration: 2000 });
  };

  return (
    <>
      <Modal
        title={`Fill the form to sell this product.`}
        description={`Product : ${selectedProduct.name}`}
        isOpen={isModalOpen}
        onClose={() => dispatch(onClose())}
      >
        <SellProductForm productQuantity={selectedProduct.quantity} />
      </Modal>
      <AlertModal
        isLoading={isLoading}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={onDelete}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            disabled={
              (isAlreadyAddedToCart && isAlreadyAddedToCart?.quantity > 0) ||
              product.quantity < 1
            }
            onClick={onAddToCart}
            className="flex items-center gap-2"
          >
            <ShoppingCart size={14} /> Cart
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={product.quantity < 1}
            onClick={() => dispatch(onOpen(product))}
            className="flex items-center gap-2"
          >
            <DollarSign size={14} /> Sell
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2"
          >
            <Trash2 size={14} /> Delete
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => navigate(`/products/update/${product._id}`)}
            className="flex items-center gap-2"
          >
            <FilePen size={14} /> Edit
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default DataTableAction;
