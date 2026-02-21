import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdmissionHome from "./Pages/adms/AdmissionHome.tsx";
import Admission1 from "./Pages/adms/Admission1.tsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<AdmissionHome />} />
          <Route path="/Admission" element={<AdmissionHome />} />
          <Route index element={<Admission1 />} />
          <Route path="/AdmissionPage1" element={<Admission1 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
