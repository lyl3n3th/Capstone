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
import SProfile from "./Pages/stdnt/SProfile.tsx";
import SGrades from "./Pages/stdnt/SGrades.tsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Public/Admission Routes */}
          <Route path="/" element={<AdmissionHome />} />
          <Route path="/Admission" element={<AdmissionHome />} />
          <Route path="/enroll" element={<Admission1 />} />
          <Route path="/information" element={<AdmissionInfo />} />
          <Route path="/requirements" element={<AdmissionReq />} />
          <Route path="/confirmation" element={<AdmissionConf />} />
          <Route path="/EntranceExam" element={<AdmissionEnt />} />

          {/* Student Routes */}
          <Route path="/student/home" element={<SHome />} />
          <Route path="/student/profile" element={<SProfile />} />
          <Route path="/student/grades" element={<SGrades />} />
          <Route
            path="/student/subjects"
            element={<div>Subjects Page (Coming Soon)</div>}
          />
          <Route
            path="/student/enrollment"
            element={<div>Enrollment Page (Coming Soon)</div>}
          />
          <Route
            path="/student/evaluation"
            element={<div>Evaluation Page (Coming Soon)</div>}
          />

          {/* Authentication Routes */}
          <Route path="/login" element={<LoginReg />} />
          <Route path="/register" element={<Reglog />} />

          {/* 404 Redirect */}
          <Route path="*" element={<AdmissionHome />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
