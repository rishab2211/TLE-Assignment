import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import HeatMap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
} from "chart.js";
import api from "@/lib/api";
import { useParams, useSearchParams } from "react-router-dom";

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip);

const ProblemSolvingDataCharts = () => {
  const { id } = useParams(); // student id from URL
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();

  const days = parseInt(searchParams.get("days") || "30", 10);

  useEffect(() => {
    if (!id) return;

    const fetchStats = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/students/${id}/problem-stats?days=${days}`);
        setStats(res.data);
      } catch (error) {
        console.error("Error fetching problem stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [id, days]);

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (!stats) {
    return <div className="text-center py-12">No stats available.</div>;
  }

  // Bar Chart Data
  const barData = {
    labels: Object.keys(stats.ratingBuckets).sort(
      (a, b) => parseInt(a) - parseInt(b)
    ),
    datasets: [
      {
        label: "Problems Solved",
        data: Object.values(stats.ratingBuckets),
        backgroundColor: "#3b82f6",
      },
    ],
  };

  // Heatmap Data
  const heatmapData = Object.entries(stats.heatmap).map(([date, count]) => ({
    date,
    count,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Bar Chart */}
      <div>
        <div className="text-sm font-semibold text-neutral-700 mb-2">
          Problems By Rating
        </div>
        <div className="h-[300px] bg-white rounded-md p-2 border">
          <Bar
            data={barData}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
            }}
          />
        </div>
      </div>

      {/* Heatmap */}
      <div>
        <div className="text-sm font-semibold text-neutral-700 mb-2">
          Submission Heatmap
        </div>
        <div className="bg-white rounded-md p-2 border overflow-x-auto">
          <HeatMap
            startDate={new Date(Date.now() - days * 86400000)}
            endDate={new Date()}
            values={Object.entries(stats.heatmap).map(([date, count]) => ({
              date: new Date(date),
              count,
            }))}
            classForValue={(value) => {
              if (!value || value.count === 0) return "color-empty";
              if (value.count < 2) return "color-scale-1";
              if (value.count < 4) return "color-scale-2";
              if (value.count < 6) return "color-scale-3";
              return "color-scale-4";
            }}
            tooltipDataAttrs={(value) => {
              if (!value?.date) return {};
              return {
                "data-tooltip-id": "tooltip",
                "data-tooltip-content": `${new Date(
                  value.date
                ).toDateString()}: ${value.count} submissions`,
              };
            }}
            showWeekdayLabels
            showOutOfRangeDays={false}
            gutterSize={2}
          />
        </div>
      </div>
    </div>
  );
};

export default ProblemSolvingDataCharts;
