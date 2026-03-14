import "../../App.css";
import { FaCopy } from "react-icons/fa";
import { FaCircleExclamation } from "react-icons/fa6";
import Progress from "../../components/Progress";
import React, { useState, useEffect } from "react";

function getQueryParam(name: string): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function generateAICSTrackingNumber() {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, ""); // YYYYMMDD
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase(); // 6 chars
  return `AICS-${datePart}-${randomPart}`;
}

function AdmissionConf() {
  const selectedBranch = getQueryParam("branch") || "";
  const studentStatus = getQueryParam("status") || "";
  const urlTrackingNumber = getQueryParam("trackingNumber") || "";

  const [trackingNumber, setTrackingNumber] = useState("");
  const [applicationData, setApplicationData] = useState<any>(null);

  useEffect(() => {
    // Try to get tracking number from multiple sources
    let foundTrackingNumber = "";

    // 1. First check URL parameter
    if (urlTrackingNumber) {
      foundTrackingNumber = urlTrackingNumber;
      console.log("Tracking number from URL:", urlTrackingNumber);
    }

    // 2. Then check sessionStorage
    const draft = sessionStorage.getItem("enrollmentDraft");
    if (draft) {
      try {
        const parsedDraft = JSON.parse(draft);
        console.log("Draft found in confirmation page:", parsedDraft);
        setApplicationData(parsedDraft);

        // Check if draft has tracking number
        if (parsedDraft.trackingNumber && !foundTrackingNumber) {
          foundTrackingNumber = parsedDraft.trackingNumber;
          console.log(
            "Tracking number from draft:",
            parsedDraft.trackingNumber,
          );
        }
      } catch (err) {
        console.warn("Failed to parse draft", err);
      }
    }

    // 3. If still no tracking number, generate AICS format one as fallback
    if (!foundTrackingNumber) {
      foundTrackingNumber = generateAICSTrackingNumber();
      console.log("Generated new AICS tracking number:", foundTrackingNumber);

      // Save it to draft for future use
      if (draft) {
        try {
          const parsedDraft = JSON.parse(draft);
          parsedDraft.trackingNumber = foundTrackingNumber;
          sessionStorage.setItem(
            "enrollmentDraft",
            JSON.stringify(parsedDraft),
          );
        } catch (err) {
          console.warn("Failed to save tracking number", err);
        }
      }
    }

    setTrackingNumber(foundTrackingNumber);
  }, [urlTrackingNumber]);

  const handleCopy = () => {
    navigator.clipboard.writeText(trackingNumber);
    alert("Tracking number copied to clipboard!");
  };

  const handleBackToRequirements = () => {
    // Save current state before navigating
    const draft = sessionStorage.getItem("enrollmentDraft");
    if (draft) {
      try {
        const parsedDraft = JSON.parse(draft);
        parsedDraft.lastVisited = new Date().toISOString();
        sessionStorage.setItem("enrollmentDraft", JSON.stringify(parsedDraft));
      } catch (err) {
        console.warn("Failed to update draft", err);
      }
    }

    window.location.href = `/requirements?branch=${encodeURIComponent(selectedBranch)}&status=${encodeURIComponent(studentStatus)}&trackingNumber=${trackingNumber}`;
  };

  const handleContinue = () => {
    // Mark application as submitted
    const draft = sessionStorage.getItem("enrollmentDraft");
    if (draft) {
      try {
        const parsedDraft = JSON.parse(draft);
        parsedDraft.submitted = true;
        parsedDraft.submissionDate = new Date().toISOString();
        sessionStorage.setItem("enrollmentDraft", JSON.stringify(parsedDraft));
      } catch (err) {
        console.warn("Failed to update draft", err);
      }
    }

    window.location.href = "/EntranceExam";
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  };

  return (
    <div className="container">
      <div className="container1">
        <Progress current={4} />
      </div>

      <div className="mcontainer">
        <div className="header">
          {/* Application Status Header */}
          <div className="syb1">
            <span className="pending-circle"></span>
            Application Status
          </div>

          {/* Status Message */}
          <div className="status">
            <p className="status-text2">Waiting for Registrar Confirmation</p>
          </div>

          {/* Tracking Number Display */}
          <div className="cont-track-wrapper">
            <label htmlFor="trackingno" className="track-label">
              Tracking Number:
            </label>
            <div className="cont-track">{trackingNumber}</div>
          </div>

          {/* Copy Button */}
          <div className="copy-wrapper">
            <button className="copy-btn" onClick={handleCopy}>
              <FaCopy className="copy-icon" />
              Copy Tracking Number
            </button>
          </div>

          {/* Application Summary Section - Using divs instead of p tags to avoid nesting issues */}
          {applicationData && (
            <div
              style={{
                backgroundColor: "#f5f5f5",
                padding: "15px",
                borderRadius: "8px",
                marginTop: "10px",
                fontSize: "14px",
                border: "1px solid #ddd",
              }}
            >
              <p style={{ fontWeight: "bold", marginBottom: "8px" }}>
                Application Summary:
              </p>

              {/* Using div for each line to avoid nested p tags */}
              <div
                style={{ marginBottom: "4px", fontSize: "12px", color: "#666" }}
              >
                Branch:{" "}
                {applicationData.branch || selectedBranch || "Not selected"}
              </div>

              <div
                style={{ marginBottom: "4px", fontSize: "12px", color: "#666" }}
              >
                Status:{" "}
                {applicationData.status || studentStatus || "Not selected"}
              </div>

              {applicationData.program && (
                <div
                  style={{
                    marginBottom: "4px",
                    fontSize: "12px",
                    color: "#666",
                  }}
                >
                  Program:{applicationData.program}
                </div>
              )}

              {applicationData.strand_or_course && (
                <div
                  style={{
                    marginBottom: "4px",
                    fontSize: "12px",
                    color: "#666",
                  }}
                >
                  Course/Strand: {applicationData.strand_or_course}
                </div>
              )}

              {(applicationData.fname || applicationData.lname) && (
                <div
                  style={{
                    marginBottom: "4px",
                    fontSize: "12px",
                    color: "#666",
                  }}
                >
                  Name: {applicationData.fname || ""}{" "}
                  {applicationData.lname || ""}
                </div>
              )}

              <div
                style={{ fontSize: "12px", color: "#666", marginTop: "8px" }}
              >
                Submitted:{" "}
                {formatDate(
                  applicationData.submissionDate || new Date().toISOString(),
                )}
              </div>
            </div>
          )}

          {/* Important Notes Section */}
          <div className="choices-note1">
            <div className="note-header1">
              <FaCircleExclamation className="exclamation-icon1" />
              <p className="note1">Important Notes:</p>
            </div>
            <p className="notice-text1">
              Please wait for the registrar to review your application and
              confirm your admission. You will receive a notification once your
              application has been reviewed.
            </p>
            <p className="notice-text1">
              You may use your tracking number&nbsp;
              <strong>{trackingNumber}</strong>&nbsp;to check the status of your
              application after submission.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="choices2 confcho">
            <button className="btn5" onClick={handleBackToRequirements}>
              Back
            </button>
            <button className="btn6" onClick={handleContinue}>
              Continue to Entrance Exam
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdmissionConf;
