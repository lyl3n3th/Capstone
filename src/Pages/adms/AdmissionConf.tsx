import "../../App.css";
import { FaCopy } from "react-icons/fa";
import { FaCircleExclamation } from "react-icons/fa6";
import Progress from "../../components/Progress";
import React, { useState, useEffect } from "react";

function getQueryParam(name: string): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function generateTrackingNumber() {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, ""); // YYYYMMDD
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase(); // 6 chars
  return `AICS-${datePart}-${randomPart}`;
}

function AdmissionConf() {
  const selectedBranch =
    getQueryParam("branch") || localStorage.getItem("branch") || "";
  const studentStatus =
    getQueryParam("status") || localStorage.getItem("status") || "";

  const [trackingNumber, setTrackingNumber] = useState("");

  useEffect(() => {
    // Generate once when component mounts
    setTrackingNumber(generateTrackingNumber());
  }, []);

  return (
    <div className="container">
      <div className="container1">
        <Progress current={4} />
      </div>

      <div className="mcontainer">
        <div className="header">
          <div className="syb1">
            <span className="pending-circle"></span>
            Application Status
          </div>

          <div className="status">
            <p className="status-text2"> Waiting for Registrar Confirmation</p>
          </div>

          <div className="cont-track-wrapper">
            <label htmlFor="trackingno" className="track-label">
              Tracking Number:
            </label>
            <div className="cont-track">{trackingNumber}</div>
          </div>

          <div className="copy-wrapper">
            <button
              className="copy-btn"
              onClick={() => {
                navigator.clipboard.writeText(trackingNumber);
                alert("Tracking number copied!");
              }}
            >
              <FaCopy className="copy-icon" />
              Copy Tracking Number
            </button>
          </div>

          <div className="choices-note1">
            <div className="note-header1">
              <FaCircleExclamation className="exclamation-icon1" />
              <p className="note1">Important Notes:</p>
            </div>
            <p className="notice-text1">
              Please for the registrar review your application and confirm your
              admission. You will receive a notification once your application
              has been reviewed.
            </p>
            <p className="notice-text1">
              You may use your tracking number to check the status of your
              application after submission.
            </p>
          </div>

          <div className="choices2">
            <button
              className="btn5"
              onClick={() =>
                (window.location.href = `/requirements?branch=${selectedBranch}&status=${studentStatus}`)
              }
            >
              Cancel
            </button>
            <button
              className="btn6"
              onClick={() => (window.location.href = "/EntranceExam")}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdmissionConf;
