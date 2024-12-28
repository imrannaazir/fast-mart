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
import { setIsOpen, setOnConfirm } from "@/redux/features/modal/alertModal.slice";
import { useAppDispatch } from "@/redux/hooks";
import { TOrder } from "@repo/utils/types";
import { Row } from "@tanstack/react-table";
import { FaEllipsis } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const OrderDataTableAction = ({ row }: { row: Row<TOrder> }) => {
  const OrderId = row.original._id;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // on confirm
  const onConfirm = async () => {
    console.log("hello world");
  };
  // on update
  const onUpdate = () => {
    navigate(`/Orders/${OrderId}`);
  };

  // on delete
  const onDelete = () => {
    dispatch(setOnConfirm(onConfirm));
    dispatch(setIsOpen(true));
  };
  const collectionActions = [
    {
      title: "Edit Order",
      icon: <BiEdit className="mr-2 h-4 w-4" />,
      fn: onUpdate,
    },
    {
      title: "Delete Order",
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
          {collectionActions.map((action, i) => (
            <DropdownMenuItem key={i} onClick={action.fn} className={cn(action.className)}>
              {action.icon}
              <span>{action.title}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OrderDataTableAction;
