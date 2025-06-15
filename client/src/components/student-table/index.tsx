import type { StudentDetails } from "@/lib/types";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { studentDetails } from "@/lib/constants";

function getData(): StudentDetails[] {
  // Fetch data from your API here.
  return studentDetails;
}

export default function DemoPage() {
  const data = getData();

  return (
    <div className="p-2 sm:p-4 md:p-10 lg:p-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
