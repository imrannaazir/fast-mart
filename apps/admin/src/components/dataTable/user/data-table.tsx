import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import TableSkeleton from "@/components/ui/table-skeleton";
import { cn } from "@/lib/utils";
import { useState } from "react";
import DataTableHeader from "../data-table-header";
import { DataTablePagination } from "../data-table-pagination";
import UserDataTableToolbar from "../data-table-toolbar";

interface UserDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading: boolean;
  showHeader?: boolean;
}

export function UserDataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  showHeader = true,
}: UserDataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  // delete category
  const onDelete = async (ids: string[]) => {
    console.log(ids);
  };

  const sortByItems = [
    {
      value: "title",
      label: "Collection title",
    },
    {
      value: "updatedAt",
      label: "Updated",
    },
    {
      value: "noOfUsers",
      label: "Users Number",
    },
  ];

  return (
    <div className="space-y-4">
      {/* table header  */}
      <div className={cn(showHeader ? "block" : "hidden")}>
        <UserDataTableToolbar sortByItems={sortByItems} />
      </div>
      <div className="bUser rounded-md">
        <Table>
          <DataTableHeader table={table} fn={onDelete} />
          {isLoading ? (
            <TableSkeleton columnNo={8} rowNo={10} />
          ) : (
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
