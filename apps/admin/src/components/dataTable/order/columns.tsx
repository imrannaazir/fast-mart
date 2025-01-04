import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { formatCurrency } from "@/lib/utils";
import { TOrder, TUser } from "@repo/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { Link } from "react-router-dom";
import OrderDataTableAction from "./data-table-action";

export const columns: ColumnDef<TOrder>[] = [
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
  {
    accessorKey: "Order",
    header: "Order",
    cell: ({ row }) => {
      return <Link to={`#`} className="text-nowrap font-semibold hover:underline">{`# ${row?.original?._id}`}</Link>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const date = row.original.createdAt;
      const now = moment(date).format("MMMM Do YYYY");
      return <p className="text-nowrap">{now}</p>;
    },
  },
  {
    accessorKey: "userId",
    header: "Customer",
    cell: ({ row }) => {
      const user = row.original?.userId as TUser;
      return <p className="text-nowrap">{`${user?.firstName} ${user?.lastName}`}</p>;
    },
  },

  {
    accessorKey: "totalAmount",
    header: "Total",
    cell: ({ row }) => {
      const totalAmount = formatCurrency(row?.original?.totalAmount as number);

      return <div className="font-semibold">{totalAmount}</div>;
    },
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
    cell: ({ row }) => {
      const paymentStatus = row?.original?.paymentStatus;
      return <Badge variant={paymentStatus === "UNPAID" ? "destructive" : "success"}>{paymentStatus}</Badge>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row?.original?.status;
      return (
        <Badge
          variant={
            status === "PLACED" ? "default" : status === "SHIPPING" || status === "PROCESSING" ? "pending" : "success"
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => {
      return <OrderDataTableAction row={row} />;
    },
  },
];
