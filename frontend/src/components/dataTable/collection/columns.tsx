import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "lucide-react";
import { toast } from "sonner";
import moment from "moment";
import { TCollection } from "@/types/collection";
import Icon from "@/components/ui/lucide-icon";

export const columns: ColumnDef<TCollection>[] = [
  // select column
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
  // image url column

  {
    header: "Title",
    cell: ({ row }) => {
      const title = row.original.title;
      // const format = row?.original?.image?.url;
      const imageUrl = row.original?.image?.url;
      return (
        <div className="flex justify-start gap-2">
          <img
            className="w-10 h-10 border-2   rounded-md border-gray-100"
            src={imageUrl}
            alt=""
          />
          <div>
            <p className="font-semibold text-gray-700">{title}</p>
            <h3 className=" uppercase font-semibold text-gray-500">/</h3>
          </div>
        </div>
      );
    },
  },
  {
    header: "Icon",
    cell: ({ row }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const iconName: any = row?.original?.icon?.name || "ban";
      console.log(iconName);

      return <Icon className="text-gray-600 w-4 h-4" name={iconName} />;
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
      // const size = row.original.size.toFixed(2);
      return <p>{0} KB</p>;
    },
  },
  {
    accessorKey: "url",
    header: "Link",
    cell: ({ row }) => {
      // const url = row.original.url;
      const onCopy = () => {
        // window.navigator.clipboard.writeText(url);
        toast.success("Link copied.", { duration: 2000 });
      };
      return (
        <Link
          className="w-8 h-8 p-2 shadow-sm border-2 text-gray-700 rounded-md cursor-pointer"
          onClick={onCopy}
        />
      );
    },
  },
];
