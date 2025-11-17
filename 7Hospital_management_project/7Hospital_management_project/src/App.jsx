import {Routes, Route } from "react-router-dom";
import Hospital_management from "./Components/Hospital_management";
import EditPatient from "./Components/FormEdit";
import Homepage from "./Components/Homepage";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/add" element={<Hospital_management />} />
        <Route path="/edit/:id" element={<EditPatient />} />
      </Routes>
  );
}

export default App;