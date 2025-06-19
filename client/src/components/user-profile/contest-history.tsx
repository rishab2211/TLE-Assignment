import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { RecentContests } from "./table";
import { mockContestHistory } from "@/lib/constants";
import StudentProfileColumns from "./columns-student-profile";

type props = {
  days: "30" | "90" | "365";
};

const ContestHistory = ({ days }: props) => {
  const [selected, setSelected] = useState(days || "30");

  useEffect(() => {
    setSelected(days);
  }, [days, setSelected]);
  return (
    <div className="border rounded-2xl m-4">
      <div className="flex items-center justify-between p-4">
        <span className="text-lg font-semibold">Contest History</span>
        <div>
          <Button
            className=""
            variant={selected == "30" ? "default" : "outline"}
          >
            30 days
          </Button>
          <Button
            className=""
            variant={selected == "90" ? "default" : "outline"}
          >
            90 days
          </Button>
          <Button
            className=""
            variant={selected == "365" ? "default" : "outline"}
          >
            365 days
          </Button>
        </div>
      </div>
      <div className="border-b" />
      <div className="p-4">
        <div className="font-semibold text-sm">Rating Progress</div>
        <div className="h-[300px] w-full bg-neutral-400 rounded-lg border flex justify-center items-center">
          Rating Graph Visualization
        </div>
      </div>

      <div className="p-4">
        <div className="text-sm font-semibold">Recent Contests</div>
        <div className="border-b" />
        <div>
          {" "}
          <RecentContests
            data={mockContestHistory}
            columns={StudentProfileColumns}
          />
        </div>
      </div>
    </div>
  );
};

export default ContestHistory;
