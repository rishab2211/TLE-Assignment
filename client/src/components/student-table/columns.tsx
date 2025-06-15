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

// This type is used to define the shape of our data.

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
      const name: string = row.original.name;
      const studentId: string = row.original.student_id;

      return (
        <div className="flex flex-col font-semibold">
          <div>{name}</div>
          <div className="text-neutral-500 dark:text-neutral-400">
            Student ID: {studentId}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "contact",
    header: "CONTACT",
    cell: ({ row }) => {
      const email: string = row.original.email;
      const phone: string = row.original.phone;

      return (
        <div className="flex flex-col font-semibold">
          <div>{email}</div>
          <div className="text-neutral-500 dark:text-neutral-400">{phone}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "codeforces_handle",
    header: "CF HANDLE",
    cell: ({ row }) => {
      const codeforces_handle: string = row.original.codeforces_handle;

      return <div>{codeforces_handle}</div>;
    },
  },
  {
    accessorKey: "rating",
    header: "RATING",
    cell: ({ row }) => {
      const current: number = row.original.current_rating;
      const max: number = row.original.max_rating;

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
    accessorKey: "last_updated",
    header: "LAST UPDATED",
    cell: ({ row }) => {
      const last_updated: string = row.original.last_data_update;

      return <div>{last_updated}</div>;
    },
  },
  {
    header: "MORE",
    id: "actions",
    cell: ({ row }) => {
      const student_id = row.original.student_id;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(student_id)}
            >
              Copy Student ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    id: "global-search", // 👈 virtual column used only for filtering
    header: () => null,
    cell: () => null,
    enableColumnFilter: true,
    filterFn: (row, _columnId, filterValue: string) => {
      const name = row.original.name?.toLowerCase() ?? "";
      const email = row.original.email?.toLowerCase() ?? "";
      const phone = row.original.phone?.toLowerCase() ?? "";
      const cfHandle = row.original.codeforces_handle?.toLowerCase() ?? "";

      const filter = filterValue.toLowerCase();

      return (
        name.includes(filter) ||
        email.includes(filter) ||
        phone.includes(filter) ||
        cfHandle.includes(filter)
      );
    },
  },
];