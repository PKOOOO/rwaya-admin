"use client";

import { ColumnDef } from "@tanstack/react-table";

export type OrderColumn = {
  id: string;
  phone: string;
  address: string;
  isPaid: boolean;
  totalPrice: string;
  products: string;
  createdAt: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },
  {
    accessorKey: "isPaid",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 rounded text-white text-xs font-medium ${
          row.getValue("isPaid") ? "bg-green-600" : "bg-red-600"
        }`}
      >
        {row.getValue("isPaid") ? "Paid" : "Unpaid"}
      </span>
    )
  }  
];
