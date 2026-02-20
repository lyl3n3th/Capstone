import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdmissionHome from "./Pages/adms/AdmissionHome.tsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<AdmissionHome />} />
          <Route path="/Admission" element={<AdmissionHome />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
