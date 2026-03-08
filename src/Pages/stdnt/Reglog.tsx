import { useState, useEffect, useRef } from "react";
import aicslogst from "../../assets/images/aicslogst-2.png";
import "../../Stud.css";

function Reglog() {
  const [selectedBranch, setSelectedBranch] = useState("");
  const [isMenuOpenBranch, setIsMenuOpenBranch] = useState(false);

  const wrapperRefBranch = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRefBranch.current &&
        !wrapperRefBranch.current.contains(event.target as Node)
      ) {
        setIsMenuOpenBranch(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [formData, setFormData] = useState({
    studentNumber: "",
    email: "",
    mobile: "",
    birthDate: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="login-page">
      <div className="login-wrapper reg-wrapper">
        <div className="login-card reg-card">
          <div className="login-content reg-content">
            <div className="header-text reg-header-text">
              <img
                src={aicslogst}
                alt="AICS Logo"
                className="logo-1 reg-logo"
              />
              <p className="reg-main-title">Account Registration</p>

              <p className="selected-branch-display reg-branch-display">
                Branch:{" "}
                <strong className={!selectedBranch ? "placeholder" : ""}>
                  {!selectedBranch ? "—" : selectedBranch}
                </strong>
              </p>
            </div>

            <div className="reg-divider"></div>

            <form
              className="login-form reg-form"
              onSubmit={async (e) => {
                e.preventDefault();

                if (!selectedBranch) {
                  alert("Please select a branch before registering!");
                  return;
                }

                if (formData.mobile.length < 11) {
                  alert("Invalid Mobile number input.");
                  return;
                }

                if (formData.password.length < 8) {
                  alert("Password must be at least 8 characters long.");
                  setFormData((prev) => ({
                    ...prev,
                    password: "",
                    confirmPassword: "",
                  }));
                  return;
                }

                if (formData.password !== formData.confirmPassword) {
                  alert("Passwords do not match.");
                  setFormData((prev) => ({
                    ...prev,
                    password: "",
                    confirmPassword: "",
                  }));
                  return;
                }

                const response = await fetch(
                  "http://127.0.0.1:8000/api/admissions/register/",
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      ...formData,
                      branch: selectedBranch,
                    }),
                  },
                );

                const result = await response.json();
                console.log(result);
                alert(result.message);

                if (response.ok) {
                  setFormData({
                    studentNumber: "",
                    email: "",
                    mobile: "",
                    birthDate: "",
                    password: "",
                    confirmPassword: "",
                  });
                  setSelectedBranch("");
                }
              }}
            >
              <div className="reg-branch-section">
                <div
                  className="dropdownlog reg-dropdown"
                  ref={wrapperRefBranch}
                >
                  <label className="lbel reg-label">Select Branch</label>
                  <div
                    className={`selectlog reg-select ${isMenuOpenBranch ? "select-clicked" : ""}`}
                    onClick={() => setIsMenuOpenBranch((p) => !p)}
                  >
                    <span className="selectedlog reg-selected">
                      {selectedBranch || "Select branch"}
                    </span>
                    <div
                      className={`cart ${isMenuOpenBranch ? "cart-rotate" : ""}`}
                    ></div>
                  </div>

                  <ul
                    className={`menulog reg-menu ${isMenuOpenBranch ? "show" : ""}`}
                  >
                    {["Taytay", "Bacoor", "GMA"].map((branch) => (
                      <li
                        key={branch}
                        onClick={() => {
                          setSelectedBranch(branch);
                          setIsMenuOpenBranch(false);
                        }}
                      >
                        {branch}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="reg-grid-container">
                <div className="reg-grid-column">
                  <div className="reg-field">
                    <label htmlFor="studentNumber">Student Number</label>
                    <input
                      id="studentNumber"
                      type="text"
                      name="studentNumber"
                      value={formData.studentNumber}
                      onChange={handleChange}
                      placeholder=""
                      required
                    />
                  </div>

                  <div className="reg-field">
                    <label htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder=""
                      required
                    />
                  </div>

                  <div className="reg-field">
                    <label htmlFor="mobile">Mobile Number</label>
                    <input
                      id="mobile"
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder=""
                      maxLength={12}
                      required
                    />
                    <small className="reg-hint">(63+) 91234567890</small>
                  </div>
                </div>

                <div className="reg-grid-column">
                  <div className="reg-field">
                    <label htmlFor="birthDate">Date of Birth</label>
                    <input
                      id="birthDate"
                      type="date"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="reg-field">
                    <label htmlFor="password">Password</label>
                    <input
                      id="password"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder=""
                      required
                    />
                  </div>

                  <div className="reg-field">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      id="confirmPassword"
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder=""
                      required
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="submit-btn reg-submit">
                Register
              </button>
            </form>

            <p className="register-prompt reg-prompt">
              Already have an account?{" "}
              <a href="/login" className="register-link reg-link">
                Sign in here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reglog;
