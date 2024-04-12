import { Table, flexRender } from "@tanstack/react-table";
import { TableHead, TableHeader, TableRow } from "../ui/table";
import { FC } from "react";
import { Button } from "../ui/button";
import AlertModal from "../modal/alert-modal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  onClose,
  onOpen,
  selectIsOpen,
} from "@/redux/features/modal/modalSlice";

type TDataTableHeaderProps<TData> = {
  table: Table<TData>;
  fn: (arg: string[]) => void;
  isLoading: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DataTableHeader: FC<TDataTableHeaderProps<any>> = ({
  table,
  fn,
  isLoading,
}) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsOpen);
  const selectedRows = table.getSelectedRowModel().rows;
  const idsToDelete = selectedRows.map((item) => item.original._id);

  return (
    <>
      <AlertModal
        isLoading={isLoading}
        isOpen={isOpen}
        onClose={() => dispatch(onClose())}
        onConfirm={() => fn(idsToDelete)}
      />

      <TableHeader className="">
        {table.getHeaderGroups().map((headerGroup) =>
          selectedRows.length ? (
            <TableRow key={headerGroup.id} className="">
              <TableHead key={headerGroup.headers[0].id}>
                {headerGroup.headers[0].isPlaceholder
                  ? null
                  : flexRender(
                      headerGroup.headers[0].column.columnDef.header,
                      headerGroup.headers[0].getContext()
                    )}
              </TableHead>
              <TableHead>{`${selectedRows.length} selected`}</TableHead>
              <TableHead></TableHead>
              <TableHead></TableHead>
              <TableHead className="text-end">
                <Button
                  onClick={() => dispatch(onOpen(true))}
                  className="py-1"
                  variant={"destructive"}
                  size={"sm"}
                >
                  Delete
                </Button>
              </TableHead>
            </TableRow>
          ) : (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          )
        )}
      </TableHeader>
    </>
  );
};

export default DataTableHeader;
