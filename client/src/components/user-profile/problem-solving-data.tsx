// import { Button } from "../ui/button";

// type Props = {};

// const buttonFilter = [
//   {
//     name: "7 days",
//   },
//   {
//     name: "30 days",
//   },
//   {
//     name: "90 days",
//   },
// ];

// const cardsData = [
//   {
//     title: "Most Difficult Problem",
//     number: "1800",
//     desc: "Rating",
//   },
//   {
//     title: "Total Prpblems",
//     number: "24",
//     desc: "Solved",
//   },
//   {
//     title: "Average Rating",
//     number: "1456",
//     desc: "Problems",
//   },
//   {
//     title: "Problems per day",
//     number: "3.4",
//     desc: "Average",
//   },
// ];

// const ProblemSolvingData = (props: Props) => {
//   return (
//     <div className="rounded-lg flex flex-col gap-4 border m-4 p-4">
//       <div className="flex items-center justify-between">
//         <span className="text-lg font-semibold">Problem Solving Data</span>
//         <div className="flex gap-2">
//           {buttonFilter.map((btn, idx) => (
//             <Button key={idx} variant={"outline"}>
//               {btn.name}
//             </Button>
//           ))}
//         </div>
//       </div>
//       <div className="border-b" />
//       <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
//         {cardsData.map((card, idx) => (
//           <div key={idx} className=" bg-neutral-200 p-2 rounded-md ">
//             <div className="text-neutral-700">{card.title}</div>
//             <div className="font-semibold">{card.number}</div>
//             <div className="text-sm">{card.desc}</div>
//           </div>
//         ))}
//       </div>
//       <div>
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//           <div>
//             <div className="text-sm font-semibold text-neutral-700">
//               Problems By Rating
//             </div>
//             <div className="h-[300px] bg-neutral-300 rounded-md flex justify-center items-center">
//               Bar chart - Rating Distribution
//             </div>
//           </div>
//           <div>
//             <div className="text-sm font-semibold text-neutral-700">
//               Submission Heatmap
//             </div>
//             <div className="h-[300px] bg-neutral-300 rounded-md flex justify-center items-center">
//               Submission Activity Heatmap
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProblemSolvingData;






import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useParams } from "react-router-dom";
import api from "@/lib/api";
import ProblemSolvingDataCharts from "./ps-data-chart";

const buttonFilter = [
  { name: "7 days", value: 7 },
  { name: "30 days", value: 30 },
  { name: "90 days", value: 90 },
];

const ProblemSolvingData = () => {
  const { id } = useParams();
  const [selectedDays, setSelectedDays] = useState(30);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<null | {
    mostDifficultProblem?: { name: string; rating: number; url: string };
    totalSolved: number;
    avgRating: number;
    avgProblemsPerDay: string;
    ratingBuckets: Record<string, number>;
    heatmap: Record<string, number>;
  }>(null);

  useEffect(() => {
    async function fetchStats() {
      if (!id) return;
      setLoading(true);
      try {
        const res = await api.get(`/students/${id}/problem-stats`, {
          params: { days: selectedDays },
        });
        setStats(res.data);
      } catch (error) {
        console.error("Failed to fetch problem-solving data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, [id, selectedDays]);

  return (
    <div className="rounded-lg flex flex-col gap-4 border m-4 p-4">
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold">Problem Solving Data</span>
        <div className="flex gap-2">
          {buttonFilter.map((btn, idx) => (
            <Button
              key={idx}
              variant={selectedDays === btn.value ? "default" : "outline"}
              onClick={() => setSelectedDays(btn.value)}
            >
              {btn.name}
            </Button>
          ))}
        </div>
      </div>

      <div className="border-b" />

      {loading && <div className="text-center py-8">Loading...</div>}
      {!loading && stats && (
        <>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
            <div className="bg-neutral-200 p-2 rounded-md">
              <div className="text-neutral-700">Most Difficult Problem</div>
              <a
                className="font-semibold underline"
                href={stats.mostDifficultProblem?.url}
                target="_blank"
              >
                {stats.mostDifficultProblem?.rating ?? "-"}
              </a>
              <div className="text-sm">
                {stats.mostDifficultProblem?.name ?? "N/A"}
              </div>
            </div>
            <div className="bg-neutral-200 p-2 rounded-md">
              <div className="text-neutral-700">Total Problems</div>
              <div className="font-semibold">{stats.totalSolved}</div>
              <div className="text-sm">Solved</div>
            </div>
            <div className="bg-neutral-200 p-2 rounded-md">
              <div className="text-neutral-700">Average Rating</div>
              <div className="font-semibold">{stats.avgRating}</div>
              <div className="text-sm">Problems</div>
            </div>
            <div className="bg-neutral-200 p-2 rounded-md">
              <div className="text-neutral-700">Problems per day</div>
              <div className="font-semibold">{stats.avgProblemsPerDay}</div>
              <div className="text-sm">Average</div>
            </div>
          </div>

          <ProblemSolvingDataCharts  />
        </>
      )}
    </div>
  );
};

export default ProblemSolvingData;
