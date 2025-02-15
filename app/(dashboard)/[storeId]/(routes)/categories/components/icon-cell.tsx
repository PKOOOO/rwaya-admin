"use client";

import React from "react";
import { IconPreview } from "@/app/(dashboard)/[storeId]/(routes)/icons/[iconId]/components/icon-form";

interface IconCellProps {
  iconValue: string;
}

export const IconCell: React.FC<IconCellProps> = ({ iconValue }) => {
  return (
    <div className="flex items-center gap-x-2">
      <IconPreview iconName={iconValue} />
    </div>
  );
};
