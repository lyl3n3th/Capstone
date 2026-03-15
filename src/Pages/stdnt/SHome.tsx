import "../../Stud.css";
import { BsCardList } from "react-icons/bs";
import { IoBookSharp } from "react-icons/io5";
import { FaGraduationCap } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { MdOutlineNoteAlt } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";
import { IoMenu } from "react-icons/io5";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

function SHome() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  // Close sidebar when clicking outside on mobile
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

  // Close sidebar when window resizes to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [sidebarOpen]);

  const handleLogout = () => {
    // Add your logout logic here
    // Clear session, redirect to login, etc.
    console.log("Logging out...");
    // Example: window.location.href = "/login";
  };

  const studentData = {
    name: "Hener C. Verdida",
    id: "20221131",
    progrm: "SHS",
    gpa: "1.75",
    enrolledSubjects: 8,
    enrollmentStatus: "Pending",
  };

  // Get current date for display in header right
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  const recentActivities = [
    {
      id: 1,
      icon: <FaGraduationCap />,
      title: "Enrollment Submitted",
      time: "2 hours ago",
      status: "pending",
    },
    {
      id: 2,
      icon: <BsCardList />,
      title: "Grades Published",
      time: "1 day ago",
      status: "completed",
    },
  ];

  const getStatusClass = (status: string) => {
    switch (status) {
      case "pending":
        return "s-status-pending";
      case "completed":
        return "s-status-completed";
      case "warning":
        return "s-status-warning";
      default:
        return "";
    }
  };

  return (
    <div className="s-portal">
      {/* Sidebar with ref for outside click detection */}
      <div
        className={`s-sidebar ${sidebarOpen ? "s-open" : ""}`}
        ref={sidebarRef}
      >
        <div className="s-sidebar-header">
          <div className="s-school-name">
            Asian Institute of Computer Studies
          </div>
          <div className="s-branch-name">Bacoor Branch</div>
        </div>

        <nav className="s-sidebar-nav">
          <ul>
            <li className="s-active">
              <a href="#">
                <FaHome /> Home
              </a>
            </li>
            <li>
              <a href="#">
                <IoPersonSharp /> Profile
              </a>
            </li>
            <li>
              <a href="#">
                <BsCardList /> Grades
              </a>
            </li>
            <li>
              <a href="#">
                <IoBookSharp /> Subjects
              </a>
            </li>
            <li>
              <a href="#">
                <FaGraduationCap /> Enrollment
              </a>
            </li>
            <li>
              <a href="#">
                <MdOutlineNoteAlt /> Evaluation
              </a>
            </li>
          </ul>
        </nav>

        {/* Updated footer with logout button */}
        <div className="s-sidebar-footer">
          <button className="s-logout-btn" onClick={handleLogout}>
            <FiLogOut /> Logout
          </button>
        </div>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div className="s-overlay" onClick={handleSidebarClose}></div>
      )}

      {/* Main Content */}
      <div className="s-main">
        <header className="s-header">
          <div className="s-header-left">
            <button className="s-menu-toggle" onClick={handleMenuClick}>
              <IoMenu size={24} />
            </button>
            <div className="s-user-profile">
              <div className="s-user-avatar">HV</div>
              <div className="s-user-details">
                <span className="s-user-name">{studentData.name}</span>
                <div className="s-user-line">
                  <span className="s-user-id">{studentData.id}</span>
                  <span className="s-user-prog">{studentData.progrm}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="s-header-right">
            <div className="s-header-date">{currentDate}</div>
          </div>
        </header>

        <main className="s-content">
          {/* Welcome Banner with Dashboard title */}
          <div className="s-welcome-banner">
            <h1>Dashboard</h1>
          </div>

          <div className="s-dashboard-grid">
            <div className="s-card">
              <div className="s-card-header">
                <BsCardList />
                <h3>Current Grades</h3>
              </div>
              <div className="s-card-value">{studentData.gpa}</div>
              <div className="s-card-label">GWA - 1st Sem</div>
              <a href="#" className="s-card-link">
                View Grades →
              </a>
            </div>

            <div className="s-card">
              <div className="s-card-header">
                <IoBookSharp />
                <h3>Enrolled Subjects</h3>
              </div>
              <div className="s-card-value">{studentData.enrolledSubjects}</div>
              <div className="s-card-label">Current Semester</div>
              <a href="#" className="s-card-link">
                View Subjects →
              </a>
            </div>

            <div className="s-card">
              <div className="s-card-header">
                <FaGraduationCap />
                <h3>Enrollment Status</h3>
              </div>
              <div className="s-card-value">{studentData.enrollmentStatus}</div>
              <div className="s-card-label">For Approval</div>
              <a href="#" className="s-card-link">
                Check Status →
              </a>
            </div>
          </div>

          <h2 className="s-section-title">Recent Activities</h2>
          <div className="s-activity-list">
            {recentActivities.map((activity) => (
              <div className="s-activity-item" key={activity.id}>
                <div className="s-activity-icon">{activity.icon}</div>
                <div className="s-activity-details">
                  <div className="s-activity-title">{activity.title}</div>
                  <div className="s-activity-time">{activity.time}</div>
                </div>
                <span
                  className={`s-activity-status ${getStatusClass(activity.status)}`}
                >
                  {activity.status.charAt(0).toUpperCase() +
                    activity.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default SHome;
