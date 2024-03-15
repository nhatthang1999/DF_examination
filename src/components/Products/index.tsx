"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import dayjs from "dayjs";
import { Badge } from "@/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import { Button } from "../ui/button";

interface DataTableProps<TData, TValue> {
  data: TData[];
}

type Item = {
  id: string;
  project_name: string;
  project_domain: string;
  last_accessed: string;
  license_use: string[];
};

export const columns = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "project_name",
    header: "Project name",
  },
  {
    accessorKey: "project_domain",
    header: "Domain",
  },
  {
    accessorKey: "last_accessed",
    header: "Last accessed",
    cell: ({ row }: any) => {
      const formatted = dayjs(new Date(row.getValue("last_accessed"))).format(
        "DD-MM-YYYY"
      );

      return <div className=" font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "license_use",
    header: "License Use",
    cell: ({ row }: any) => {
      const license = row.getValue("license_use");

      return (
        <>
          {license.map((item: any) => (
            <HoverCard key={item?.license_type}>
              <HoverCardTrigger asChild>
                <Button variant="link">{item?.license_type}</Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="flex justify-between space-x-4 border bg-white rounded-[20px] p-2">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">Library</h4>
                    {item.libraries.map((library: string) => (
                      <p className="text-sm ml-1" key={library}>
                        {library}
                      </p>
                    ))}
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
        </>
      );
    },
  },
];
export function Products<TData, TValue>({
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
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
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
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
      </Table>
    </div>
  );
}

export default Products;
