"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { IconCell } from "./icon-cell";

export type CategoryColumn = {
  id: string;
  name: string;
  billboardLabel: string;
  iconId: string;
  iconValue: string; // Add this field
  createdAt: string;
};


export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "billboardLabel", // Fixed incorrect key name
    header: "Billboard",
    cell: ({ row }) => row.original.billboardLabel,
  },
  {
    accessorKey: "iconValue",
    header: "Icon",
    cell: ({ row }) => <IconCell iconValue={row.original.iconValue} />,
  },
  
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  }
];
