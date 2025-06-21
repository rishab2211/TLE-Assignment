import type { ColumnDef } from "@tanstack/react-table";
import type { ContestEntry } from "@/lib/types";

const StudentProfileColumns: ColumnDef<ContestEntry>[] = [
  {
    accessorKey: "contestName",
    header: "Contest",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => new Date(row.original.date).toLocaleDateString(),
  },
  {
    accessorKey: "rank",
    header: "Rank",
  },
  {
    accessorKey: "ratingChange",
    header: "Δ Rating",
  },
  {
    accessorKey: "problemsAttempted",
    header: "Attempted",
  },
  {
    accessorKey: "problemsUnsolved",
    header: "Unsolved",
  },{
  id: "global-search",
  header: () => null,
  cell: () => null,
  enableColumnFilter: true,
  filterFn: (row, _columnId, filterValue: string) => {
    const contestName = row.original.contestName?.toLowerCase() ?? "";
    const rank = row.original.rank?.toString().toLowerCase() ?? "";
    const ratingChange = row.original.ratingChange?.toString().toLowerCase() ?? "";
    const filter = filterValue.toLowerCase();

    return (
      contestName.includes(filter) ||
      rank.includes(filter) ||
      ratingChange.includes(filter)
    );
  },
},

];

export default StudentProfileColumns;
