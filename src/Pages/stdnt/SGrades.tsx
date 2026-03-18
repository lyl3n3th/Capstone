import "../../Stud.css";
import { useState, useEffect, useRef } from "react";
import { IoMenu } from "react-icons/io5";
import {
  FaDownload,
  FaFilter,
  FaCalendarAlt,
  FaGraduationCap,
} from "react-icons/fa";
import { BsCardList } from "react-icons/bs";
import { IoDocumentText } from "react-icons/io5";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

function SGrades() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState("2025-2026");
  const [selectedSemester, setSelectedSemester] = useState("1st Semester");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredGrades, setFilteredGrades] = useState<any[]>([]);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Mock student data
  const studentData = {
    name: "Hener C. Verdida",
    id: "20221131",
    progrm: "SHS",
    strand: "TVL - ICT",
  };

  // Mock grades data
  const gradesData = [
    {
      id: 1,
      subjectCode: "ENG112",
      subjectTitle: "Reading and Writing Skills",
      firstQuarter: 81,
      secondQuarter: 85,
      thirdQuarter: "-",
      fourthQuarter: "-",
      academicYear: "2025-2026",
      semester: "1st Semester",
    },
    {
      id: 2,
      subjectCode: "FIL112",
      subjectTitle:
        "Pagbabasa at Pagsusuri ng Iba't-ibang Teksto tungo sa Pananaliksik",
      firstQuarter: 79,
      secondQuarter: 88,
      thirdQuarter: "-",
      fourthQuarter: "-",
      academicYear: "2025-2026",
      semester: "1st Semester",
    },
    {
      id: 3,
      subjectCode: "NTS112",
      subjectTitle: "Physical Science",
      firstQuarter: 80,
      secondQuarter: 82,
      thirdQuarter: "-",
      fourthQuarter: "-",
      academicYear: "2025-2026",
      semester: "1st Semester",
    },
    {
      id: 4,
      subjectCode: "CP1121",
      subjectTitle: "Computer Programming 2 (.NET Technology NC III)",
      firstQuarter: 89,
      secondQuarter: 87,
      thirdQuarter: "-",
      fourthQuarter: "-",
      academicYear: "2025-2026",
      semester: "1st Semester",
    },
    {
      id: 5,
      subjectCode: "MATH112",
      subjectTitle: "General Mathematics",
      firstQuarter: 83,
      secondQuarter: 84,
      thirdQuarter: "-",
      fourthQuarter: "-",
      academicYear: "2025-2026",
      semester: "1st Semester",
    },
    {
      id: 6,
      subjectCode: "SOC112",
      subjectTitle: "Understanding Culture, Society and Politics",
      firstQuarter: 86,
      secondQuarter: 85,
      thirdQuarter: "-",
      fourthQuarter: "-",
      academicYear: "2025-2026",
      semester: "1st Semester",
    },
  ];

  const academicYears = ["2024-2025", "2025-2026", "2026-2027"];

  const semesters = ["1st Semester", "2nd Semester", "Summer"];

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  // filter grades based on selected academic year and semester
  useEffect(() => {
    const filtered = gradesData.filter(
      (grade) =>
        grade.academicYear === selectedAcademicYear &&
        grade.semester === selectedSemester,
    );
    setFilteredGrades(filtered);
  }, [selectedAcademicYear, selectedSemester]);

  const handleFilter = () => {
    setShowFilters(!showFilters);
  };

  const handleGenerateReportCard = () => {
    alert(
      "Generating Report Card for " +
        selectedAcademicYear +
        " - " +
        selectedSemester,
    );
  };

  const handleLogout = () => {
    console.log("Logging out...");
    // window.location.href = "/login";
  };

  // get current date
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  return (
    <div className="s-portal">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={handleSidebarClose}
        activePage="grades"
        onLogout={handleLogout}
      />

      {sidebarOpen && (
        <div className="s-overlay" onClick={handleSidebarClose}></div>
      )}

      <div className="s-main">
        <Header
          title="Grades"
          onMenuClick={handleMenuClick}
          studentData={studentData}
          currentDate={currentDate}
        />

        <main className="s-content">
          <div className="s-welcome-banner s-grades-banner">
            <div className="s-grades-banner-content">
              <h1>Grades</h1>
            </div>
          </div>

          <div className="s-grades-controls-row">
            <div className="s-grades-banner-subtitle">
              <span className="s-academic-year">
                <FaCalendarAlt /> {selectedAcademicYear}
              </span>
              <span className="s-semester">
                <FaGraduationCap /> {selectedSemester}
              </span>
            </div>

            <div className="s-grades-banner-actions">
              <button className="s-filter-btn" onClick={handleFilter}>
                <FaFilter /> Filter
              </button>
              <button
                className="s-generate-btn"
                onClick={handleGenerateReportCard}
              >
                <FaDownload /> Generate Report Card
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="s-filter-panel">
              <h3>Filter Grades</h3>
              <div className="s-filter-row">
                <div className="s-filter-group">
                  <label>Academic Year</label>
                  <select
                    value={selectedAcademicYear}
                    onChange={(e) => setSelectedAcademicYear(e.target.value)}
                    className="s-filter-select"
                  >
                    {academicYears.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="s-filter-group">
                  <label>Semester</label>
                  <select
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(e.target.value)}
                    className="s-filter-select"
                  >
                    {semesters.map((sem) => (
                      <option key={sem} value={sem}>
                        {sem}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          <div className="s-notice-card">
            <div className="s-notice-icon">
              <IoDocumentText />
            </div>
            <div className="s-notice-content">
              <h4>Note:</h4>
              <p>
                Grades are released once per semester after all assessments have
                been reviewed and finalized. If a grade is not yet visible, it
                is still being processed.
              </p>
            </div>
          </div>

          <div className="s-grades-table-container">
            <table className="s-grades-table">
              <thead>
                <tr>
                  <th>Subject Code</th>
                  <th>Subject Title</th>
                  <th>1st Quarter</th>
                  <th>2nd Quarter</th>
                  <th>3rd Quarter</th>
                  <th>4th Quarter</th>
                </tr>
              </thead>
              <tbody>
                {filteredGrades.length > 0 ? (
                  filteredGrades.map((grade) => (
                    <tr key={grade.id}>
                      <td className="s-subject-code">{grade.subjectCode}</td>
                      <td className="s-subject-title">{grade.subjectTitle}</td>
                      <td className="s-grade-value">{grade.firstQuarter}</td>
                      <td className="s-grade-value">{grade.secondQuarter}</td>
                      <td className="s-grade-value">{grade.thirdQuarter}</td>
                      <td className="s-grade-value">{grade.fourthQuarter}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="s-no-data">
                      No grades found for the selected academic year and
                      semester.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

export default SGrades;
