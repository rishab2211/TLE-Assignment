import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import StudentTable from "./components/student-table";
import UserProfileIndex from "./components/user-profile/user-profile";
function App() {
  return (
    <div className="flex flex-col no-scrollbar">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudentTable/>}/>
        <Route  path="/user-profile/:id" element={<UserProfileIndex/>} />
      </Routes>
      </BrowserRouter>
 </div>
  );
}

export default App;