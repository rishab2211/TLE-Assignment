import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { RecentContests } from "./table";
import StudentProfileColumns from "./columns-student-profile";
import type { ContestHistoryResponse, ContestEntry } from "@/lib/types";
import api from "@/lib/api";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { useParams, useSearchParams } from "react-router-dom";

Chart.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip);

const ContestHistory = () => {
  const [days, setDays] = useState<"30" | "90" | "365">();
  const [history, setHistory] = useState<ContestHistoryResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
   const handle = searchParams.get("handle");

  // Fetch whenever days or handle changes
  useEffect(() => {
    async function fetchHistory() {
      setLoading(true);
      try {
       
        const res = await api.get(
          `/contest-history?handle=${handle}&days=${days}`
        );

        console.log("CONTEST HISTORY:", res);

        setHistory(res.data);
      } catch (error) {
        console.error("Failed to fetch contest-history:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, [days, handle]);

  // Build Chart.js data
  const chartData = history
    ? {
        labels: history.ratingGraph.map((p) =>
          new Date(p.timestamp).toLocaleDateString()
        ),
        datasets: [
          {
            label: "Rating",
            data: history.ratingGraph.map((p) => p.newRating),
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59,130,246,0.2)",
            tension: 0.3,
          },
        ],
      }
    : null;

  return (
    <div className="border rounded-2xl m-4">
      {/* Header & Day Selector */}
      <div className="flex items-center justify-between p-4">
        <span className="text-lg font-semibold">Contest History</span>
        <div className="flex space-x-2">
          {(["30", "90", "365"] as const).map((d) => (
            <Button
              key={d}
              variant={days === d ? "default" : "outline"}
              onClick={() => setDays(d)}
            >
              {d} days
            </Button>
          ))}
        </div>
      </div>

      <div className="border-b" />

      {/* Rating Graph */}
      <div className="p-4">
        <div className="font-semibold text-sm">Rating Progress</div>
        <div className="h-[300px] w-full">
          {loading && (
            <div className="flex justify-center items-center h-full">
              Loading...
            </div>
          )}
          {!loading && chartData && (
            <Line
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  tooltip: {
                    enabled: true,
                  },
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: "Date",
                    },
                  },
                  y: {
                    beginAtZero: false,
                    title: {
                      display: true,
                      text: "Rating",
                    },
                  },
                },
              }}
            />
          )}
          {!loading && !chartData && (
            <div className="text-center pt-12">No data available.</div>
          )}
        </div>
      </div>

      {/* Contest List Table */}
      <div className="p-4">
        <div className="text-sm font-semibold">Recent Contests</div>
        <div className="border-b my-2" />
        {history ? (
          <RecentContests
            data={history.contestList as ContestEntry[]}
            columns={StudentProfileColumns}
          />
        ) : (
          <div className="text-center py-8">No contest data to display</div>
        )}
      </div>
    </div>
  );
};

export default ContestHistory;
