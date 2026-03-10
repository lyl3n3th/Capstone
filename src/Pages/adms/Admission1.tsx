import "../../App.css";
import { useState, useRef, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import Progress from "../../components/Progress";

function Admission1() {
  const [selected, setSelected] = useState<string>("");
  const [status, setStatus] = useState("Select Status");
  const [isMenuOpenStatus, setIsMenuOpenStatus] = useState(false);
  const wrapperRefStatus = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(false);

  //continue

  const handleContinue = async () => {
    if (!selected || status === "Select Status") return;

    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:8000/api/admissions/branch/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ branch: selected, status }),
        },
      );

      if (!response.ok) throw new Error("Failed to save progress");

      const data = await response.json();
      localStorage.setItem("enrolleeId", data.id);
      window.location.href = `/information?branch=${selected}&status=${status}`;
    } catch (err) {
      alert("Error saving branch/status");
    } finally {
      setLoading(false);
    }
  };

  const statusOptions = [
    "Junior High Completer",
    "Senior High Graduate",
    "Transferee",
    "Foreign Student",
    "Cross-Registrant",
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRefStatus.current &&
        !wrapperRefStatus.current.contains(event.target as Node)
      ) {
        setIsMenuOpenStatus(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="container">
      <div className="container1">
        <Progress current={1} />
      </div>

      <div className="mcontainer">
        <div className="header">
          <div className="dropdownb" ref={wrapperRefStatus}>
            <label>Student Status</label>
            <div
              className={`selectb ${isMenuOpenStatus ? "select-clicked" : ""}`}
              onClick={() => setIsMenuOpenStatus((p) => !p)}
            >
              <span className="selected">{status}</span>
              <div
                className={`cartb ${isMenuOpenStatus ? "cart-rotate" : ""}`}
              ></div>
            </div>
            <ul className={`menub ${isMenuOpenStatus ? "show" : ""}`}>
              {statusOptions.map((opt) => (
                <li
                  key={opt}
                  onClick={() => {
                    setStatus(opt);
                    setIsMenuOpenStatus(false);
                  }}
                >
                  {opt}
                </li>
              ))}
            </ul>
          </div>

          <hr style={{ opacity: 0.1, margin: "20px 0" }} />
          <div className="syb">
            Select Your Branch
            <p>Choose the branch you wish to enroll in</p>
          </div>

          <div
            className={`choices ${selected === "Taytay" ? "selected" : ""} ${
              status === "Senior High Graduate" ? "disabled-branch" : ""
            }`}
            onClick={() =>
              status !== "Senior High Graduate" && setSelected("Taytay")
            }
          >
            <span className="circle1">
              <FaLocationDot />
            </span>
            <div className="location-text">
              <p className="location">Taytay</p>
              <p className="campus">Taytay branch</p>
            </div>
          </div>

          <div
            className={`choices ${selected === "Bacoor" ? "selected" : ""}`}
            onClick={() => setSelected("Bacoor")}
          >
            <span className="circle1">
              <FaLocationDot />
            </span>
            <div className="location-text">
              <p className="location">Bacoor</p>
              <p className="campus">Bacoor branch</p>
            </div>
          </div>

          <div
            className={`choices ${selected === "GMA" ? "selected" : ""} ${
              status === "Senior High Graduate" ? "disabled-branch" : ""
            }`}
            onClick={() =>
              status !== "Senior High Graduate" && setSelected("GMA")
            }
          >
            <span className="circle1">
              <FaLocationDot />
            </span>
            <div className="location-text">
              <p className="location">GMA</p>
              <p className="campus">GMA branch</p>
            </div>
          </div>

          <div className="choices2">
            <button
              className="btn1"
              onClick={() => (window.location.href = "/admission")}
            >
              Cancel
            </button>
            <button
              className={`btn2 ${!selected || status === "Select Status" ? "disabled" : ""}`}
              onClick={handleContinue}
              disabled={!selected || status === "Select Status" || loading}
            >
              {loading ? "Saving..." : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admission1;
