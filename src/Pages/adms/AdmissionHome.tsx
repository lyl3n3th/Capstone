import { FaRegPaperPlane } from "react-icons/fa6";
import "../../App.css";
import logow from "../../assets/images/logow.png";
import { useState } from "react";

function AdmissionHome() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTrackProgress = () => {
    setError("");

    if (!trackingNumber.trim()) {
      setError("Please enter a tracking number");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      try {
        const draft = sessionStorage.getItem("enrollmentDraft");

        console.log("Searching for tracking number:", trackingNumber.trim());
        console.log("Current draft in storage:", draft);

        if (draft) {
          const parsedDraft = JSON.parse(draft);
          const storedTrackingNumber = parsedDraft.trackingNumber;

          console.log("Stored tracking number:", storedTrackingNumber);
          console.log("Comparison:", {
            input: trackingNumber.trim().toUpperCase(),
            stored: storedTrackingNumber?.toUpperCase(),
            match:
              storedTrackingNumber?.toUpperCase() ===
              trackingNumber.trim().toUpperCase(),
          });

          if (
            storedTrackingNumber &&
            storedTrackingNumber.toUpperCase() ===
              trackingNumber.trim().toUpperCase()
          ) {
            console.log("Tracking number matched! Redirecting...");

            const branch = parsedDraft.branch || "";
            const status = parsedDraft.status || "";
            const program = parsedDraft.program || "";

            window.location.href = `/confirmation?branch=${encodeURIComponent(branch)}&status=${encodeURIComponent(status)}&trackingNumber=${encodeURIComponent(trackingNumber.trim())}&program=${encodeURIComponent(program)}`;
            return;
          } else {
            setError("Tracking number not found. Please check and try again.");
          }
        } else {
          console.log("No draft found in sessionStorage");
          setError("No application found with this tracking number.");
        }
      } catch (err) {
        console.error("Error checking tracking number:", err);
        setError("An error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }, 800);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pastedText = e.clipboardData.getData("text");

    setTrackingNumber(pastedText);
    setError("");

    console.log("Pasted text:", pastedText);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleTrackProgress();
    }
  };

  return (
    <section className="hero">
      <div className="content">
        <h1>
          Asian Institute of <br />
          Computer Studies
        </h1>

        <p>Go Beyond Learning</p>
        <p id="p2">ADMISSION PORTAL</p>

        <a
          href="/enroll"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = "/enroll";
          }}
        >
          Enroll Now
        </a>
        <img src={logow} alt="logo" className="logo"></img>

        <div className="form-container">
          <input
            type="text"
            placeholder="Input Tracking Number"
            className={`input-field ${error ? "input-error" : ""}`}
            value={trackingNumber}
            onChange={(e) => {
              setTrackingNumber(e.target.value);
              setError("");
            }}
            onPaste={handlePaste}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
          {error && (
            <div
              style={{
                color: "#dc3545",
                fontSize: "14px",
                marginTop: "5px",
                textAlign: "left",
                paddingLeft: "10px",
              }}
            >
              {error}
            </div>
          )}
        </div>

        <div className="track-container">
          <a
            href="#"
            className={`track-cont ${isLoading ? "disabled" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              if (!isLoading) {
                handleTrackProgress();
              }
            }}
            style={{
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
          >
            <FaRegPaperPlane />
            <span>{isLoading ? "Checking..." : "Track Progress"}</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default AdmissionHome;
