import "../../Stud.css";
import { useState, useRef } from "react";
import { IoMenu } from "react-icons/io5";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import Sidebar from "../../components/Sidebar";
import { useStudent } from "../../context/StudentContext";

function SProfile() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { student, isLoading, error, updateStudent } = useStudent();
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<any>>({});
  const [isSaving, setIsSaving] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Check if mobile on resize
  useState(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  // Close sidebar when clicking outside on mobile
  useState(() => {
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
  });

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    console.log("Logging out...");
  };

  const handleEdit = () => {
    setEditForm(student || {});
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setEditForm(student || {});
  };

  const handleSaveEdit = async () => {
    setIsSaving(true);
    try {
      await updateStudent(editForm);
      setEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      alert("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const getInitials = () => {
    if (!student) return "";
    return `${student.firstName?.charAt(0) || ""}${student.lastName?.charAt(0) || ""}`;
  };

  // Show nothing while loading the first time
  if (isLoading && !student) {
    return (
      <div className="s-portal s-profile">
        <div style={{ minHeight: "100vh" }}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="s-portal s-profile">
        <div className="s-error-container">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="s-portal s-profile">
        <div className="s-error-container">No profile data found</div>
      </div>
    );
  }

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
              <div className="s-profile-name-row">
                <h1>
                  {student.firstName} {student.lastName}
                </h1>
                {!editing && (
                  <button className="s-edit-btn" onClick={handleEdit}>
                    <FaEdit /> Edit Profile
                  </button>
                )}
              </div>
              <div className="s-profile-badges">
                <span className="s-badge">{student.studentNumber}</span>
                <span className="s-badge">{student.yearLevel}</span>
                <span className="s-badge s-badge-success">
                  {student.status}
                </span>
              </div>
              <p className="s-profile-track">{student.program}</p>
              <p className="s-profile-grade">{student.yearLevel}</p>
            </div>
          </div>

          {/* Edit Mode Controls */}
          {editing && (
            <div className="s-edit-actions">
              <button
                className="s-save-btn"
                onClick={handleSaveEdit}
                disabled={isSaving}
              >
                <FaSave /> {isSaving ? "Saving..." : "Save Changes"}
              </button>
              <button className="s-cancel-btn" onClick={handleCancelEdit}>
                <FaTimes /> Cancel
              </button>
            </div>
          )}

          {/* Personal Information Section */}
          <div className="s-profile-section">
            <h2 className="s-section-title-with-icon">
              <IoPersonSharp /> Personal Information
            </h2>
            <div className="s-profile-grid">
              <div className="s-profile-field">
                <label>First Name:</label>
                {editing ? (
                  <input
                    type="text"
                    value={editForm.firstName || ""}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                  />
                ) : (
                  <span>{student.firstName}</span>
                )}
              </div>
              <div className="s-profile-field">
                <label>Middle Name:</label>
                {editing ? (
                  <input
                    type="text"
                    value={editForm.middleName || ""}
                    onChange={(e) =>
                      handleInputChange("middleName", e.target.value)
                    }
                  />
                ) : (
                  <span>{student.middleName || "-"}</span>
                )}
              </div>
              <div className="s-profile-field">
                <label>Last Name:</label>
                {editing ? (
                  <input
                    type="text"
                    value={editForm.lastName || ""}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                  />
                ) : (
                  <span>{student.lastName}</span>
                )}
              </div>
              <div className="s-profile-field">
                <label>Sex:</label>
                {editing ? (
                  <select
                    value={editForm.gender || ""}
                    onChange={(e) =>
                      handleInputChange("gender", e.target.value)
                    }
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                ) : (
                  <span>{student.gender}</span>
                )}
              </div>
              <div className="s-profile-field">
                <label>Civil Status:</label>
                {editing ? (
                  <input
                    type="text"
                    value={editForm.civilStatus || ""}
                    onChange={(e) =>
                      handleInputChange("civilStatus", e.target.value)
                    }
                  />
                ) : (
                  <span>{student.civilStatus || "Single"}</span>
                )}
              </div>
              <div className="s-profile-field">
                <label>Religion:</label>
                {editing ? (
                  <input
                    type="text"
                    value={editForm.religion || ""}
                    onChange={(e) =>
                      handleInputChange("religion", e.target.value)
                    }
                  />
                ) : (
                  <span>{student.religion || "-"}</span>
                )}
              </div>
              <div className="s-profile-field">
                <label>Date of Birth:</label>
                {editing ? (
                  <input
                    type="date"
                    value={editForm.birthday || ""}
                    onChange={(e) =>
                      handleInputChange("birthday", e.target.value)
                    }
                  />
                ) : (
                  <span>{student.birthday || "-"}</span>
                )}
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="s-profile-section">
            <h2 className="s-section-title-with-icon">
              <FaMapMarkerAlt /> Address
            </h2>
            <div className="s-profile-grid">
              <div className="s-profile-field s-full-width">
                <label>Complete Address:</label>
                {editing ? (
                  <textarea
                    rows={3}
                    value={editForm.address || ""}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    placeholder="Enter your complete address"
                  />
                ) : (
                  <span>{student.address || "-"}</span>
                )}
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
                {editing ? (
                  <input
                    type="email"
                    value={editForm.email || ""}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                ) : (
                  <span>{student.email}</span>
                )}
              </div>
              <div className="s-profile-field">
                <label>Mobile #:</label>
                {editing ? (
                  <input
                    type="tel"
                    value={editForm.contactNumber || ""}
                    onChange={(e) =>
                      handleInputChange("contactNumber", e.target.value)
                    }
                  />
                ) : (
                  <span>{student.contactNumber}</span>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default SProfile;
