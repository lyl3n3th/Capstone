import "../../Stud.css";
import { BsCardList } from "react-icons/bs";
import { IoBookSharp } from "react-icons/io5";
import { FaGraduationCap } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { MdOutlineNoteAlt } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { MdFormatListBulleted } from "react-icons/md";
import { useState, useEffect, useRef } from "react";
import { IoMenu } from "react-icons/io5";
import { IoDocumentText } from "react-icons/io5";
import Sidebar from "../../components/Sidebar"; // Updated import path

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
    console.log("Logging out...");
    // Add your logout logic here
    // window.location.href = "/login";
  };

  const studentData = {
    name: "Hener C. Verdida",
    id: "20221131",
    progrm: "SHS",
    gpa: "1.75",
    enrolledSubjects: 8,
    enrollmentStatus: "Pending",
    strand: "TVL - ICT",
    email: "ayawkona@gmail.com",
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
      {/* Sidebar Component */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={handleSidebarClose}
        activePage="home"
        onLogout={handleLogout}
      />

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
            <div className="s-groupc">
              <div className="s-card">
                <div className="s-card-header">
                  <div className="s-box-icon">
                    <FaCalendarAlt />
                  </div>
                  <h3>Current Academic Year</h3>
                </div>
                <div className="s-card-value">2026 - 2027</div>
              </div>

              <div className="s-card g2">
                <div className="s-card-header">
                  <div className="s-box-icon">
                    <MdFormatListBulleted />
                  </div>
                  <h3>Current Semester</h3>
                </div>
                <div className="s-card-value">1st Semester</div>
              </div>

              <div className="s-card g2">
                <div className="s-card-header">
                  <div className="s-box-icon">
                    <IoPersonSharp />
                  </div>
                  <h3>Current Status</h3>
                </div>
                <div className="s-card-value">Regular</div>
              </div>
            </div>

            <div className="s-card">
              <div className="s-card-header1">
                <h3>{studentData.name}</h3>
                <span className="s-str-p">{studentData.strand}</span>
              </div>
              <div className="s-card-value1">Student Number:</div>
              <div className="s-card-label1">{studentData.id}</div>
              <div className="s-card-value1">Email:</div>
              <div className="s-card-label1">{studentData.email}</div>
              <div className="s-card-value1">Password:</div>
              <div className="s-card-label1">************</div>
            </div>

            <div className="s-card">
              <div className="s-card-header1">
                <h3>News & Announcement</h3>
              </div>
              <div className="s-news-content">
                <p>No new announcements</p>
              </div>
            </div>
          </div>

          <div className="s-icon-ac">
            <div className="s-co">
              <IoDocumentText />
            </div>
            <h2 className="s-section-title">Credential Status</h2>
          </div>

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
