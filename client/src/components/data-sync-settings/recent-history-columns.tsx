import type { ColumnDef } from "@tanstack/react-table";

type RecentHistoryColumn = {
  date_time: string;
  status: "success" | "partial" | "failed";
  students_updated: string;
  duration: string;
  type: "handle_update" | "scheduled";
};

const RecentHistoryColumns: ColumnDef<RecentHistoryColumn>[] = [
  {
    accessorKey: "date_time",
    header: "Date & Time",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "students_updated",
    header: "Students Updated",
  },
  {
    accessorKey: "duration",
    header: "Duration",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
];

export default RecentHistoryColumns;
