import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import Navbar from "../navbar";
import api from "@/lib/api";
import type { StudentDetails } from "@/lib/types";

export default function StudentTable() {
  const [data, setData] = useState<StudentDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const res = await api.get<StudentDetails[]>("/students");
        setData(res.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStudents();
  }, []);

  return (
    <div className="w-full h-screen">
      <Navbar />
      <div className="p-4">
        {loading ? (
          <div className="text-center text-lg font-medium">Loading...</div>
        ) : (
          <DataTable columns={columns} data={data} />
        )}
      </div>
    </div>
  );
}
