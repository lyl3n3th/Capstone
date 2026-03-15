import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdmissionHome from "./Pages/adms/AdmissionHome.tsx";
import Admission1 from "./Pages/adms/Admission1.tsx";
import AdmissionInfo from "./Pages/adms/AdmissionInfo.tsx";
import AdmissionReq from "./Pages/adms/AdmissionReq.tsx";
import AdmissionConf from "./Pages/adms/AdmissionConf.tsx";
import AdmissionEnt from "./Pages/adms/AdmissionEnt.tsx";
import LoginReg from "./Pages/stdnt/LoginReg.tsx";
import Reglog from "./Pages/stdnt/Reglog.tsx";
import SHome from "./Pages/stdnt/SHome.tsx";

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
          <Route index element={<AdmissionConf />} />
          <Route path="/confirmation" element={<AdmissionConf />} />
          <Route index element={<AdmissionEnt />} />
          <Route path="/EntranceExam" element={<AdmissionEnt />} />
          <Route index element={<LoginReg />} />
          <Route path="login" element={<LoginReg />} />
          <Route index element={<Reglog />} />
          <Route path="Registration" element={<Reglog />} />
          <Route index element={<SHome />} />
          <Route path="StudentHome" element={<SHome />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
