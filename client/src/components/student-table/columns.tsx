import type { StudentDetails } from "@/lib/types";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "../ui/checkbox";
import { useNavigate } from "react-router-dom";
import { RowActions } from "./row-actions";

export const columns: ColumnDef<StudentDetails>[] = [
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
  {
    accessorKey: "name",
    header: "STUDENT",
    cell: ({ row }) => {
      const name = `${row.original.firstName} ${row.original.lastName}`;
      const id = row.original._id;

      return (
        <div className="flex flex-col font-semibold">
          <div>{name}</div>
          <div className="text-neutral-500 dark:text-neutral-400">ID: {id}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "handle",
    header: "CF HANDLE",
    cell: ({ row }) => {
      const handle = row.original.handle;
      return <div>{handle}</div>;
    },
  },
  {
    accessorKey: "rating",
    header: "RATING",
    cell: ({ row }) => {
      const current = row.original.currentRating;
      const max = row.original.maxRating;

      return (
        <div className="flex flex-col font-semibold">
          <div>Current: {current}</div>
          <div className="text-neutral-500 dark:text-neutral-400">
            Max: {max}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "rank",
    header: "RANK",
    cell: ({ row }) => {
      const rank = row.original.rank;
      const maxRank = row.original.maxRank;

      return (
        <div className="flex flex-col font-semibold">
          <div>{rank}</div>
          <div className="text-neutral-500 dark:text-neutral-400">
            Max: {maxRank}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "lastOnlineTimeSeconds",
    header: "LAST ONLINE",
    cell: ({ row }) => {
      const date = new Date(row.original.lastOnlineTimeSeconds);
      return <div>{date.toLocaleString()}</div>;
    },
  },
  {
    header: "MORE",
    id: "actions",
    cell: ({ row }) => {
      const id = row.original._id;

      return <RowActions id={id} handle={row.original.handle} />;
    },
  },
  {
    id: "global-search",
    header: () => null,
    cell: () => null,
    enableColumnFilter: true,
    filterFn: (row, _columnId, filterValue: string) => {
      const first = row.original.firstName?.toLowerCase() ?? "";
      const last = row.original.lastName?.toLowerCase() ?? "";
      const handle = row.original.handle?.toLowerCase() ?? "";

      const filter = filterValue.toLowerCase();
      return (
        first.includes(filter) ||
        last.includes(filter) ||
        handle.includes(filter)
      );
    },
  },
];
