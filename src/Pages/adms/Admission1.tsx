import "../../App.css";
import { useState, useRef, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import Progress from "../../components/Progress";
import { v4 as uuidv4 } from "uuid";

function Admission1() {
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [status, setStatus] = useState("Select Status");
  const [isMenuOpenStatus, setIsMenuOpenStatus] = useState(false);
  const wrapperRefStatus = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(false);

  const branchRules: Record<string, string[]> = {
    "Junior High Completer": ["bacoor", "taytay", "GMA"],
    "Senior High Graduate": ["bacoor"],
    Transferee: ["bacoor", "taytay", "GMA"],
    "Foreign Student": ["bacoor", "taytay", "GMA"],
    "Cross-Registrant": ["bacoor", "taytay", "GMA"],
  };

  const isBranchDisabled = (branchName: string) => {
    if (status === "Select Status") return true;
    return !branchRules[status]?.includes(branchName);
  };

  const handleContinue = () => {
    if (!selectedBranch || status === "Select Status") {
      alert("Please select student status and branch.");
      return;
    }

    setLoading(true);

    const fakeTrackingNumber = `TRK-${uuidv4().slice(0, 8).toUpperCase()}`;

    sessionStorage.setItem(
      "enrollmentDraft",
      JSON.stringify({
        trackingNumber: fakeTrackingNumber,
        branch: selectedBranch,
        status: status,
        step: 1,
        createdAt: new Date().toISOString(),
      }),
    );

    setTimeout(() => {
      setLoading(false);

      window.location.href = `/information?branch=${encodeURIComponent(selectedBranch)}&status=${encodeURIComponent(status)}`;
    }, 600);
  };

  useEffect(() => {
    const saved = sessionStorage.getItem("enrollmentDraft");
    if (saved) {
      const draft = JSON.parse(saved);
      setStatus(draft.status || "Select Status");
      setSelectedBranch(draft.branch || "");
    }
  }, []);

  const statusOptions = [
    "Junior High Completer",
    "Senior High Graduate",
    "Transferee",
    "Foreign Student",
    "Cross-Registrant",
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRefStatus.current &&
        !wrapperRefStatus.current.contains(event.target as Node)
      ) {
        setIsMenuOpenStatus(false);
      }
    };
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
                    setSelectedBranch("");
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

          {["bacoor", "taytay", "GMA"].map((branchName) => (
            <div
              key={branchName}
              className={`choices ${
                selectedBranch === branchName ? "selected" : ""
              } ${isBranchDisabled(branchName) ? "disabled-branch" : ""}`}
              onClick={() =>
                !isBranchDisabled(branchName) && setSelectedBranch(branchName)
              }
            >
              <span className="circle1">
                <FaLocationDot />
              </span>
              <div className="location-text">
                <p className="location">
                  {branchName.charAt(0).toUpperCase() + branchName.slice(1)}
                </p>
                <p className="campus">
                  {branchName.charAt(0).toUpperCase() + branchName.slice(1)}{" "}
                  branch
                </p>
              </div>
            </div>
          ))}

          <div className="choices2">
            <button
              className="btn1"
              onClick={() => (window.location.href = "/admission")}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              className={`btn2 ${!selectedBranch || status === "Select Status" || loading ? "disabled" : ""}`}
              onClick={handleContinue}
              disabled={
                !selectedBranch || status === "Select Status" || loading
              }
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
