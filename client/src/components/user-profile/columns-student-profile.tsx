import type { ColumnDef } from "@tanstack/react-table";

type ContestHistory = {
  contest_name: string;
  date: string;
  rank: number;
  rating_change: number;
  problems_solved: number;
};

const StudentProfileColumns: ColumnDef<ContestHistory>[] = [
  {
    accessorKey: "contest_name",
    header: "CONTEST",
  },
  {
    accessorKey: "date",
    header: "DATE",
  },
  {
    accessorKey: "rank",
    header: "RANK",
  },
  { accessorKey: "rating_change", header: "RATING CHANGE" },
  {
    accessorKey: "problems_solved",
    header: "PROBLEM SOLVED",
  },
];

export default StudentProfileColumns;
