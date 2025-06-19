import type { ColumnDef } from "@tanstack/react-table";


type StudentSyncStatusColumns = {
  name: string;
  email: string;
  cf_handle: string;
  last_updated: string;
  status: "updated" | "syncing" | "failed" | "pending";
  action: "Sync now" | "In Progress" | "Retry";
};

const StudentSyncStatusColumns: ColumnDef<StudentSyncStatusColumns>[] = [
  {
    id: "student",
    header: "Student",
    cell: ({ row }) => {
      const name = row.original.name;
      const email = row.original.email;

      return (
        <div className="flex flex-col">
          <span>{name}</span>
          <span>{email}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "cf_handle",
    header: "CF Handle",
  },
  {
    accessorKey: "last_updated",
    header: "Last Updated",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "action",
    header: "Actions",
  },
];

export default StudentSyncStatusColumns;
