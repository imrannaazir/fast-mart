import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { TUser } from "@repo/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import UserDataTableAction from "./data-table-action";

export const columns: ColumnDef<TUser>[] = [
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
    header: "Customer",
    cell: ({ row }) => {
      const { firstName, lastName, photo } = row?.original || {};

      const imageUrl = photo?.url || "https://i.pinimg.com/564x/0c/bb/aa/0cbbaab0deff7f188a7762d9569bf1b3.jpg";
      return (
        <div className="flex items-center justify-start gap-2">
          <img className="h-10 w-10 rounded-md border-2 border-gray-100" src={imageUrl} alt="" />
          <div>
            <Link to={`#`} className="font-semibold hover:underline">{`${firstName} ${lastName}`}</Link>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const email = row.original.email;
      return <p>{email}</p>;
    },
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
    cell: ({ row }) => {
      const phoneNumber = row.original.phoneNumber;
      return <p>{phoneNumber || "Not added"}</p>;
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row?.original?.status;
      return (
        <Badge variant={status === "ACTIVE" ? "success" : status === "BLOCKED" ? "destructive" : "pending"}>
          {status}
        </Badge>
      );
    },
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => {
      return <UserDataTableAction row={row} />;
    },
  },
];
