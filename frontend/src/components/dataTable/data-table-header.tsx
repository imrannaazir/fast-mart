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
import { cn } from "@/lib/utils";

type TDataTableHeaderProps<TData> = {
  table: Table<TData>;
  fn: (arg: string[]) => void;
  isLoading: boolean;
  extraColumn: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DataTableHeader: FC<TDataTableHeaderProps<any>> = ({
  table,
  fn,
  isLoading,
  extraColumn,
}) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsOpen);
  const selectedRows = table.getSelectedRowModel().rows;
  const isSelected = selectedRows.length ? true : false;
  const idsToDelete = selectedRows.map((item) => item.original._id);

  // generate extra column length array
  const columnArr: number[] = [];

  for (let i = 0; i < extraColumn; i++) {
    columnArr.push(i);
  }

  return (
    <>
      <AlertModal
        isLoading={isLoading}
        isOpen={isOpen}
        onClose={() => dispatch(onClose())}
        onConfirm={() => fn(idsToDelete)}
      />

      <TableHeader className=" ">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} className="  relative">
            {headerGroup.headers.map((header, i) => {
              return (
                <TableHead
                  className={cn(
                    i === 0
                      ? "opacity-100"
                      : isSelected
                      ? "opacity-0"
                      : "opacity-100"
                  )}
                  key={header.id}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              );
            })}
            <div className={cn(isSelected ? "block" : "hidden")}>
              <div className="absolute top-3 left-20">{`${selectedRows.length} selected`}</div>
              <div className="absolute top-1.5 right-2">
                {" "}
                <Button
                  onClick={() => dispatch(onOpen(true))}
                  className="py-1"
                  variant={"destructive"}
                  size={"sm"}
                >
                  Delete
                </Button>
              </div>
            </div>
          </TableRow>
        ))}
      </TableHeader>
    </>
  );
};

export default DataTableHeader;

/* 


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
              {columnArr.map((item) => (
                <TableHead key={item}></TableHead>
              ))}
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
          ) : (*/
