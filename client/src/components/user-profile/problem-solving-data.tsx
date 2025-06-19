import { Button } from "../ui/button";

type Props = {};

const buttonFilter = [
  {
    name: "7 days",
  },
  {
    name: "30 days",
  },
  {
    name: "90 days",
  },
];

const cardsData = [
  {
    title: "Most Difficult Problem",
    number: "1800",
    desc: "Rating",
  },
  {
    title: "Total Prpblems",
    number: "24",
    desc: "Solved",
  },
  {
    title: "Average Rating",
    number: "1456",
    desc: "Problems",
  },
  {
    title: "Problems per day",
    number: "3.4",
    desc: "Average",
  },
];

const ProblemSolvingData = (props: Props) => {
  return (
    <div className="rounded-lg flex flex-col gap-4 border m-4 p-4">
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold">Problem Solving Data</span>
        <div className="flex gap-2">
          {buttonFilter.map((btn, idx) => (
            <Button key={idx} variant={"outline"}>
              {btn.name}
            </Button>
          ))}
        </div>
      </div>
      <div className="border-b" />
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {cardsData.map((card, idx) => (
          <div key={idx} className=" bg-neutral-200 p-2 rounded-md ">
            <div className="text-neutral-700">{card.title}</div>
            <div className="font-semibold">{card.number}</div>
            <div className="text-sm">{card.desc}</div>
          </div>
        ))}
      </div>
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <div className="text-sm font-semibold text-neutral-700">
              Problems By Rating
            </div>
            <div className="h-[300px] bg-neutral-300 rounded-md flex justify-center items-center">
              Bar chart - Rating Distribution
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold text-neutral-700">
              Submission Heatmap
            </div>
            <div className="h-[300px] bg-neutral-300 rounded-md flex justify-center items-center">
              Submission Activity Heatmap
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemSolvingData;
