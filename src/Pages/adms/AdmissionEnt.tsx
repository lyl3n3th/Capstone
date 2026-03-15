import "../../App.css";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaCircleExclamation } from "react-icons/fa6";
import Progress from "../../components/Progress";
import { useState, useEffect } from "react";

function getQueryParam(name: string): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function AdmissionEnt() {
  const selectedBranch = getQueryParam("branch") || "";
  const studentStatus = getQueryParam("status") || "";
  const trackingNumber = getQueryParam("trackingNumber") || "";
  const program = getQueryParam("program") || "";

  const [examDetails, setExamDetails] = useState({
    date: "",
    time: "",
    location: "",
    room: "",
  });

  const [applicantName, setApplicantName] = useState("");

  useEffect(() => {
    // Get applicant data from sessionStorage
    const draft = sessionStorage.getItem("enrollmentDraft");
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        setApplicantName(`${parsed.fname || ""} ${parsed.lname || ""}`.trim());

        // Generate exam details based on branch
        const examDates = [
          "March 20, 2026",
          "March 22, 2026",
          "March 25, 2026",
          "March 27, 2026",
        ];
        const examTimes = [
          "9:00 AM - 11:00 AM",
          "1:00 PM - 3:00 PM",
          "3:30 PM - 5:30 PM",
        ];
        const locations: Record<string, { location: string; room: string }> = {
          bacoor: { location: "Bacoor Branch", room: "PE Room" },
          taytay: { location: "Taytay Branch", room: "Auditorium" },
          GMA: { location: "GMA Branch", room: "PE Room" },
        };

        // Use branch to determine location, or default
        const branchInfo = locations[selectedBranch.toLowerCase()] || {
          location: "Main Campus",
          room: "Room 101",
        };

        // Generate random but consistent exam details based on tracking number
        const hash = trackingNumber
          ? trackingNumber.charCodeAt(trackingNumber.length - 1) || 0
          : 0;
        const dateIndex = hash % examDates.length;
        const timeIndex = Math.floor(hash / 2) % examTimes.length;

        setExamDetails({
          date: examDates[dateIndex],
          time: examTimes[timeIndex],
          location: branchInfo.location,
          room: branchInfo.room,
        });
      } catch (err) {
        console.warn("Failed to parse draft", err);
      }
    }
  }, [selectedBranch, trackingNumber]);

  const handleAddToCalendar = () => {
    alert(
      `Added to calendar:\nEntrance Exam\n${examDetails.date} ${examDetails.time}\n${examDetails.location} - ${examDetails.room}`,
    );
  };

  const handleDownloadPermit = () => {
    alert(
      `Exam permit downloaded for ${applicantName || "Applicant"}. Please bring this on exam day.`,
    );
  };

  const handleBackToHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="container">
      <div className="container1">
        <Progress current={5} />
      </div>

      <div className="mcontainer">
        <div className="header3">
          <div className="syb">
            <h2 className="exam-title">
              You are assigned to take the Entrance Exam
            </h2>
            {applicantName && (
              <p style={{ fontSize: "12px", marginTop: "5px", color: "#555" }}>
                Applicant: <strong>{applicantName}</strong>
              </p>
            )}
            <p style={{ fontSize: "12px", color: "#666" }}>
              Program: <strong>{program}</strong> | Branch:{" "}
              <strong>{selectedBranch}</strong>
            </p>
          </div>

          <div className="exam-card">
            <hr className="divider" />

            <h3 className="exam-heading">Exam Details:</h3>

            <div className="exam-details">
              <div className="exam-row">
                <span className="exam-icon">
                  <FaCalendarAlt />
                </span>
                <div className="exam-text">
                  <strong>Date:</strong> {examDetails.date || "To be announced"}
                </div>
              </div>

              <div className="exam-row">
                <span className="exam-icon">
                  <FaClock />
                </span>
                <div className="exam-text">
                  <strong>Time:</strong> {examDetails.time || "To be announced"}
                </div>
              </div>

              <div className="exam-row">
                <span className="exam-icon">
                  <FaLocationDot />
                </span>
                <div className="exam-text">
                  <strong>Location:</strong>{" "}
                  {examDetails.location || "To be announced"} -{" "}
                  {examDetails.room}
                </div>
              </div>

              <div className="exam-row">
                <span className="exam-icon">
                  <strong>#</strong>
                </span>
                <div className="exam-text">
                  <strong>Tracking #:</strong> {trackingNumber}
                </div>
              </div>
            </div>

            <div className="add-calendar">
              <button className="btn6" onClick={handleAddToCalendar}>
                <FaCalendarAlt style={{ marginRight: 8 }} /> Add to Calendar
              </button>
              <button className="btn6" onClick={handleDownloadPermit}>
                Download Permit
              </button>
            </div>

            <div className="choices-note1">
              <div className="note-header1">
                <FaCircleExclamation className="exclamation-icon1" />
                <p className="note1">Important Notes:</p>
              </div>
              <p className="notice-text1">
                Please bring the following during exam:
              </p>
              <p className="notice-text1">• School ID</p>
              <p className="notice-text1">• Exam Permit</p>
              <p className="notice-text1">• Black pen</p>
              <p className="notice-text1">
                • Tracking Number: <strong>{trackingNumber}</strong>
              </p>
            </div>

            <div className="choices2 back-wrapper">
              <button className="btn6" onClick={handleBackToHome}>
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdmissionEnt;
