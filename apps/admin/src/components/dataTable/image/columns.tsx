import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "lucide-react";
import { toast } from "sonner";
import moment from "moment";
import { TImage } from "@repo/utils/types";

export const columns: ColumnDef<TImage>[] = [
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
    header: "File Name",
    cell: ({ row }) => {
      const fileName = row.original.file_name;
      const format = row?.original?.format;
      const imageUrl = row.original.url;
      return (
        <div className="flex justify-start gap-2">
          <img className="h-10 w-10 rounded-md border-2 border-gray-100" src={imageUrl} alt="" />
          <div>
            <p className="font-semibold text-gray-700">{fileName}</p>
            <h3 className="font-semibold uppercase text-gray-500">{format}</h3>
          </div>
        </div>
      );
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
    header: "Size",
    cell: ({ row }) => {
      const size = row.original.size.toFixed(2);
      return <p>{size} KB</p>;
    },
  },
  {
    accessorKey: "url",
    header: "Link",
    cell: ({ row }) => {
      const url = row.original.url;
      const onCopy = () => {
        window.navigator.clipboard.writeText(url);
        toast.success("Link copied.", { duration: 2000 });
      };
      return (
        <Link className="h-8 w-8 cursor-pointer rounded-md border-2 p-2 text-gray-700 shadow-sm" onClick={onCopy} />
      );
    },
  },
];
