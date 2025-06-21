import type { ColumnDef } from "@tanstack/react-table";
import type { ContestEntry } from "@/lib/types";
import { DataTable } from "../student-table/data-table";

export function RecentContests({
  data,
  columns,
}: {
  data: ContestEntry[];
  columns: ColumnDef<ContestEntry>[];
}) {
  return <DataTable data={data} columns={columns} />;
}
