import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdmissionHome from "./Pages/adms/AdmissionHome.tsx";
import Admission1 from "./Pages/adms/Admission1.tsx";
import AdmissionInfo from "./Pages/adms/AdmissionInfo.tsx";
import AdmissionReq from "./Pages/adms/AdmissionReq.tsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<AdmissionHome />} />
          <Route path="/Admission" element={<AdmissionHome />} />
          <Route index element={<Admission1 />} />
          <Route path="/enroll" element={<Admission1 />} />
          <Route index element={<AdmissionInfo />} />
          <Route path="/information" element={<AdmissionInfo />} />
          <Route index element={<AdmissionReq />} />
          <Route path="/requirements" element={<AdmissionReq />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
