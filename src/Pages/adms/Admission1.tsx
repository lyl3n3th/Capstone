import "../../App.css";
import { useState, useRef, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import Progress from "../../components/Progress";

// Define this once at the top
function generateAICSTrackingNumber() {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, ""); // YYYYMMDD
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase(); // 6 chars
  return `AICS-${datePart}-${randomPart}`;
}

function Admission1() {
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [status, setStatus] = useState("Select Status");
  const [isMenuOpenStatus, setIsMenuOpenStatus] = useState(false);
  const wrapperRefStatus = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(false);

  // Check if returning from information page
  const fromInfo =
    new URLSearchParams(window.location.search).get("from") === "info";

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

    // Check if we have existing draft data from Info page
    const existingDraft = sessionStorage.getItem("enrollmentDraft");
    let draftData;

    if (existingDraft) {
      try {
        const parsed = JSON.parse(existingDraft);

        // Use existing tracking number or generate new AICS format one
        const trackingNum =
          parsed.trackingNumber || generateAICSTrackingNumber();

        draftData = {
          ...parsed, // This preserves all the info page data if it exists
          trackingNumber: trackingNum,
          branch: selectedBranch,
          status: status,
          step: 1,
          lastUpdated: new Date().toISOString(),
        };
      } catch (err) {
        console.warn("Failed to parse existing draft", err);
        // Create new draft with AICS tracking number
        draftData = {
          trackingNumber: generateAICSTrackingNumber(),
          branch: selectedBranch,
          status: status,
          step: 1,
          createdAt: new Date().toISOString(),
        };
      }
    } else {
      // Create new draft with AICS tracking number
      draftData = {
        trackingNumber: generateAICSTrackingNumber(),
        branch: selectedBranch,
        status: status,
        step: 1,
        createdAt: new Date().toISOString(),
      };
    }

    sessionStorage.setItem("enrollmentDraft", JSON.stringify(draftData));
    console.log(
      "Saved to draft with tracking number:",
      draftData.trackingNumber,
    );

    setTimeout(() => {
      setLoading(false);
      window.location.href = `/information?branch=${encodeURIComponent(selectedBranch)}&status=${encodeURIComponent(status)}&trackingNumber=${draftData.trackingNumber}`;
    }, 600);
  };

  const handleCancel = () => {
    window.location.href = "/admission";
  };

  // Load saved data on component mount
  useEffect(() => {
    const saved = sessionStorage.getItem("enrollmentDraft");
    if (saved) {
      try {
        const draft = JSON.parse(saved);
        console.log("Loading saved draft in Step 1:", draft);

        // Restore status and branch if they exist
        if (draft.status) {
          setStatus(draft.status);
        }
        if (draft.branch) {
          setSelectedBranch(draft.branch);
        }
      } catch (err) {
        console.warn("Failed to parse draft", err);
      }
    }
  }, []);

  // When returning from info, make sure we have the latest data
  useEffect(() => {
    if (fromInfo) {
      console.log("Returning from information page, reloading data...");
      const saved = sessionStorage.getItem("enrollmentDraft");
      if (saved) {
        try {
          const draft = JSON.parse(saved);
          console.log("Reloading data from draft on return:", draft);
          if (draft.status) setStatus(draft.status);
          if (draft.branch) setSelectedBranch(draft.branch);
        } catch (err) {
          console.warn("Failed to parse draft", err);
        }
      }
    }
  }, [fromInfo]);

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
          {fromInfo && (
            <div
              style={{
                backgroundColor: "#e8f4fd",
                padding: "10px",
                borderRadius: "5px",
                marginBottom: "15px",
                fontSize: "14px",
                color: "#1A3D5C",
              }}
            >
              ✓ Returning from information page. Your selection has been
              restored.
            </div>
          )}

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
                    setSelectedBranch(""); // Reset branch when status changes

                    // Update draft
                    const draft = sessionStorage.getItem("enrollmentDraft");
                    if (draft) {
                      const parsed = JSON.parse(draft);
                      parsed.status = opt;
                      parsed.branch = "";
                      sessionStorage.setItem(
                        "enrollmentDraft",
                        JSON.stringify(parsed),
                      );
                    }
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
              onClick={() => {
                if (!isBranchDisabled(branchName)) {
                  setSelectedBranch(branchName);

                  // Update draft
                  const draft = sessionStorage.getItem("enrollmentDraft");
                  if (draft) {
                    const parsed = JSON.parse(draft);
                    parsed.branch = branchName;
                    sessionStorage.setItem(
                      "enrollmentDraft",
                      JSON.stringify(parsed),
                    );
                  }
                }
              }}
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
            <button className="btn1" onClick={handleCancel} disabled={loading}>
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
