"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { IconPreview } from "@/components/ui/icon-preview"; // Import optimized IconPreview component


export type IconColumn = {
  id: string;
  name: string;
  iconvalue: string;
  createdAt: string;
};

export const icons: ColumnDef<IconColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "iconvalue",
    header: "icon",
    cell: ({ row }) => (
<div className="flex items-center gap-x-2">
        <IconPreview iconName={row.original.iconvalue} /> {/* Render the actual icon */}
      </div>
    )
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({row}) => <CellAction  data={row.original} />
  }
];
