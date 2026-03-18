import "../../Stud.css";
import { BsCardList } from "react-icons/bs";
import { IoBookSharp } from "react-icons/io5";
import { FaGraduationCap } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { MdOutlineNoteAlt } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { MdFormatListBulleted } from "react-icons/md";
import { useState, useEffect, useRef } from "react";
import { IoDocumentText } from "react-icons/io5";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";
import { MdFileUpload } from "react-icons/md";
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

  const [uploadedFiles, setUploadedFiles] = useState<
    Record<number, { name: string; url?: string }>
  >({});
  const [uploadingId, setUploadingId] = useState<number | null>(null);

  const handleFileUpload = async (activityId: number) => {
    // Create a hidden file input
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf,.jpg,.jpeg,.png,.doc,.docx";

    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      // Show uploading state
      setUploadingId(activityId);

      // Create FormData
      const formData = new FormData();
      formData.append("file", file);
      formData.append("activityId", activityId.toString());
      formData.append("studentId", studentData.id);

      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Save uploaded file info
        setUploadedFiles((prev) => ({
          ...prev,
          [activityId]: {
            name: file.name,
            url: URL.createObjectURL(file),
          },
        }));

        console.log(`File uploaded for activity ${activityId}:`, file.name);
      } catch (error) {
        console.error("Upload failed:", error);
        alert("Upload failed. Please try again.");
      } finally {
        setUploadingId(null);
      }
    };

    input.click();
  };

  const handleSubmitDocuments = () => {
    const hasUploads = Object.keys(uploadedFiles).length > 0;

    if (!hasUploads) {
      alert("Please upload at least one document before submitting.");
      return;
    }

    if (window.confirm("Are you sure you want to submit these documents?")) {
      console.log("Submitting documents:", uploadedFiles);

      alert("Documents submitted successfully!");
    }
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
      icon: <MdOutlineDriveFolderUpload />,
      title: "Form 137",
      time: "2 hours ago",
      status: "pending",
    },
    {
      id: 2,
      icon: <MdOutlineDriveFolderUpload />,
      title: "Good Moral ",
      time: "1 day ago",
      status: "completed",
    },
    {
      id: 3,
      icon: <MdOutlineDriveFolderUpload />,
      title: "Diploma/Certificate of Completion",
      status: "completed",
    },
    {
      id: 4,
      icon: <MdOutlineDriveFolderUpload />,
      title: "Birth Certificate/PSA",
      status: "pending",
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
    <div className="s-portal s-home">
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
        {/* Header Component - Now using the new Header component */}
        <Header
          title="Dashboard"
          onMenuClick={handleMenuClick}
          studentData={studentData}
          currentDate={currentDate}
        />

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

          <div className="s-credential-header">
            <div className="s-icon-ac">
              <div className="s-co">
                <IoDocumentText />
              </div>
              <h2 className="s-section-title">Credential Status</h2>
            </div>
            <button
              className="s-submit-docs-btn"
              onClick={handleSubmitDocuments}
            >
              <MdFileUpload /> Submit Documents
            </button>
          </div>

          <div className="s-activity-list">
            {recentActivities.map((activity) => (
              <div className="s-activity-item" key={activity.id}>
                <div
                  className="s-activity-icon"
                  onClick={() => handleFileUpload(activity.id)}
                  style={{
                    cursor: "pointer",
                    position: "relative",
                    opacity: uploadingId === activity.id ? 0.7 : 1,
                  }}
                >
                  {uploadingId === activity.id ? (
                    <div className="s-upload-spinner">
                      <FaSpinner />
                    </div>
                  ) : (
                    activity.icon
                  )}
                </div>
                <div className="s-activity-details">
                  <div className="s-activity-title">{activity.title}</div>

                  {uploadedFiles[activity.id] && (
                    <div className="s-uploaded-file-info">
                      <span className="s-file-name">
                        {uploadedFiles[activity.id].name}
                      </span>
                    </div>
                  )}
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
