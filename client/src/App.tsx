import "./App.css";
import DemoPage from "./components/student-table";
import Navbar from "./components/navbar";
import ContestHistory from "./components/user-profile/contest-history";

function App() {

  return (
    <div className="flex flex-col no-scrollbar">
      <ContestHistory days="90"/>
    </div>
  );
}

export default App;
