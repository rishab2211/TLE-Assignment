import "./App.css";
import ContestHistory from "./components/user-profile/contest-history";
import ProblemSolvingData from "./components/user-profile/problem-solving-data";

function App() {
  return (
    <div className="flex flex-col no-scrollbar">
      <ContestHistory days="90" />
      <ProblemSolvingData/>
 </div>
  );
}

export default App;