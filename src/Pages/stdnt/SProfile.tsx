import "../../Stud.css";
import { useState, useEffect, useRef } from "react";
import { IoMenu } from "react-icons/io5";
import { FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import Sidebar from "../../components/Sidebar";

function SProfile() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Check if mobile on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      // Auto-close sidebar when resizing to desktop
      if (window.innerWidth > 768 && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [sidebarOpen]);

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

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    // window.location.href = "/login";
  };

  const studentData = {
    name: "Hener C. Verdida",
    studentNumber: "20221131",
    section: "ICT2DA",
    status: "Regular",
    track: "Technical Livelihood Track - ICT",
    gradeLevel: "Grade-11",
    firstName: "Hener",
    middleName: "C.",
    lastName: "Verdida",
    civilStatus: "Single",
    religion: "Roman Catholic",
    citizenship: "Filipino",
    sex: "Male",
    dateOfBirth: "January 15, 2008",
    province: "Cavite",
    city: "Bacoor",
    barangay: "Molino 3",
    street: "Blk 15 Lot 8, Phase 2, Green Valley Subdivision",
    email: "hener.verdida@gmail.com",
    mobile: "0912 345 6789",
    guardian: "Erlinda C. Verdida",
    guardianMobile: "0923 456 7890",
  };

  const getInitials = () => {
    return studentData.name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  return (
    <div className="s-portal s-profile">
      <button
        className={`s-mobile-menu-btn ${sidebarOpen ? "s-hidden" : ""}`}
        onClick={handleMenuClick}
        aria-label="Open menu"
      >
        <IoMenu size={24} />
      </button>

      {/* Sidebar Component */}
      <div ref={sidebarRef}>
        <Sidebar
          isOpen={sidebarOpen}
          onClose={handleSidebarClose}
          activePage="profile"
          onLogout={handleLogout}
        />
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div className="s-overlay" onClick={handleSidebarClose}></div>
      )}

      {/* Main Content */}
      <div className="s-main">
        <main className="s-profile-content">
          {/* Profile Header Card */}
          <div className="s-profile-header-card">
            <div className="s-profile-avatar-large">{getInitials()}</div>
            <div className="s-profile-header-info">
              <h1>{studentData.name}</h1>
              <div className="s-profile-badges">
                <span className="s-badge">{studentData.studentNumber}</span>
                <span className="s-badge">{studentData.section}</span>
                <span className="s-badge s-badge-success">
                  {studentData.status}
                </span>
              </div>
              <p className="s-profile-track">{studentData.track}</p>
              <p className="s-profile-grade">{studentData.gradeLevel}</p>
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="s-profile-section">
            <h2 className="s-section-title-with-icon">
              <IoPersonSharp /> Personal Information
            </h2>
            <div className="s-profile-grid">
              <div className="s-profile-field">
                <label>First Name:</label>
                <span>{studentData.firstName}</span>
              </div>
              <div className="s-profile-field">
                <label>Civil Status:</label>
                <span>{studentData.civilStatus}</span>
              </div>
              <div className="s-profile-field">
                <label>Middle Name:</label>
                <span>{studentData.middleName}</span>
              </div>
              <div className="s-profile-field">
                <label>Religion:</label>
                <span>{studentData.religion}</span>
              </div>
              <div className="s-profile-field">
                <label>Last Name:</label>
                <span>{studentData.lastName}</span>
              </div>
              <div className="s-profile-field">
                <label>Citizenship:</label>
                <span>{studentData.citizenship}</span>
              </div>
              <div className="s-profile-field">
                <label>Sex:</label>
                <span>{studentData.sex}</span>
              </div>
              <div className="s-profile-field">
                <label>Date of Birth:</label>
                <span>{studentData.dateOfBirth}</span>
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="s-profile-section">
            <h2 className="s-section-title-with-icon">
              <FaMapMarkerAlt /> Address
            </h2>
            <div className="s-profile-grid">
              <div className="s-profile-field">
                <label>Province:</label>
                <span>{studentData.province}</span>
              </div>
              <div className="s-profile-field">
                <label>City/Municipality:</label>
                <span>{studentData.city}</span>
              </div>
              <div className="s-profile-field">
                <label>Barangay:</label>
                <span>{studentData.barangay}</span>
              </div>
              <div className="s-profile-field s-full-width">
                <label>House/Blk/Street:</label>
                <span>{studentData.street}</span>
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="s-profile-section">
            <h2 className="s-section-title-with-icon">
              <FaEnvelope /> Contact Info
            </h2>
            <div className="s-profile-grid">
              <div className="s-profile-field">
                <label>Email:</label>
                <span>{studentData.email}</span>
              </div>
              <div className="s-profile-field">
                <label>Mobile #:</label>
                <span>{studentData.mobile}</span>
              </div>
              <div className="s-profile-field">
                <label>Guardian/Parent:</label>
                <span>{studentData.guardian}</span>
              </div>
              <div className="s-profile-field">
                <label>Guardian/Parent #:</label>
                <span>{studentData.guardianMobile}</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default SProfile;
