import { useState, useEffect, useRef } from "react";
import slidelog from "../../assets/images/slidelog.jpg";
import slidelog2 from "../../assets/images/slidelog2.jpg";
import slidelog3 from "../../assets/images/slidelog3.jpg";
import bg from "../../assets/images/bg.jpg";
import aicslogst from "../../assets/images/aicslogst-2.png";
import "../../Stud.css";

function LoginReg() {
  const [selectedBranch, setSelectedBranch] = useState("");
  const [isMenuOpenBranch, setIsMenuOpenBranch] = useState(false);

  const wrapperRefBranch = useRef<HTMLDivElement>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [bg, slidelog, slidelog2, slidelog3];

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

  // Auto-slide logic
  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  //login state
  const [loginData, setLoginData] = useState({
    branch: "",
    studentNumber: "",
    password: "",
  });

  //login handle
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!loginData.branch) {
      alert("Please select a branch!");
      return;
    }

    const response = await fetch(
      "http://127.0.0.1:8000/api/admissions/login/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      },
    );

    const result = await response.json();
    alert(result.message);

    if (response.ok) {
      console.log("Logged in student:", result);

      setLoginData({
        branch: "",
        studentNumber: "",
        password: "",
      });
      setSelectedBranch("");
    }
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">
        <div className="swiper-side">
          <div className="custom-slider">
            {slides.map((src, index) => (
              <div
                key={index}
                className={`slide ${index === currentSlide ? "active" : ""}`}
                style={{ backgroundImage: `url(${src})` }}
              />
            ))}

            <div className="slide-overlay" />

            <button className="nav-arrow prev" onClick={goToPrevious}>
              ❮
            </button>
            <button className="nav-arrow next" onClick={goToNext}>
              ❯
            </button>

            <div className="dots">
              {slides.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === currentSlide ? "active" : ""}`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="login-card">
          <div className="login-content">
            <div className="logo-header">
              <img src={aicslogst} className="logo-1" alt="Logo" />
            </div>
            <div className="header-text">
              <p className="pent">Enter your credentials to continue</p>

              <p className="selected-branch-display">
                Branch:{" "}
                <strong className={!selectedBranch ? "placeholder" : ""}>
                  {!selectedBranch ? "—" : selectedBranch}
                </strong>
              </p>
            </div>

            <form className="login-form" onSubmit={handleLogin}>
              <div className="dropdownlog" ref={wrapperRefBranch}>
                <label className="lbel">Select Branch</label>
                <div
                  className={`selectlog ${isMenuOpenBranch ? "select-clicked" : ""}`}
                  onClick={() => setIsMenuOpenBranch((p) => !p)}
                >
                  <span className="selectedlog">{selectedBranch}</span>
                  <div
                    className={`cart ${isMenuOpenBranch ? "cart-rotate" : ""}`}
                  ></div>
                </div>

                <ul className={`menulog ${isMenuOpenBranch ? "show" : ""}`}>
                  {["Taytay", "Bacoor", "GMA"].map((branch) => (
                    <li
                      key={branch}
                      onClick={() => {
                        setSelectedBranch(branch);
                        setLoginData({ ...loginData, branch });
                        setIsMenuOpenBranch(false);
                      }}
                    >
                      {branch}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="divider"></div>

              <div className="form-groups">
                <label htmlFor="username">Student Number</label>
                <input
                  id="username"
                  type="text"
                  name="studentNumber"
                  value={loginData.studentNumber}
                  onChange={(e) =>
                    setLoginData({
                      ...loginData,
                      studentNumber: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="form-groups">
                <label htmlFor="password">Password</label>
                <div className="password-wrapper">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword}
                  </button>
                </div>
              </div>

              <div className="forgot-link-wrapper">
                <a href="#" className="forgot-link">
                  Forgot password?
                </a>
              </div>

              <button type="submit" className="submit-btn">
                Submit
              </button>
            </form>

            <p className="register-prompt">
              Don't have an account?{" "}
              <a href="/registration" className="register-link">
                Create one now
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginReg;
