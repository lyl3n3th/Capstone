import "../../App.css";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaCircleExclamation } from "react-icons/fa6";
import Progress from "../../components/Progress";

function AdmissionEnt() {
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
            <p />
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
                  <strong>Date:</strong>
                </div>
              </div>

              <div className="exam-row">
                <span className="exam-icon">
                  <FaClock />
                </span>
                <div className="exam-text">
                  <strong>Time:</strong>
                </div>
              </div>

              <div className="exam-row">
                <span className="exam-icon">
                  <FaLocationDot />
                </span>
                <div className="exam-text">
                  <strong>Location:</strong>
                </div>
              </div>
            </div>

            <div className="add-calendar">
              <button
                className="btn6"
                onClick={() => {
                  alert("Added to calendar");
                }}
              >
                <FaCalendarAlt style={{ marginRight: 8 }} /> Add to Calendar
              </button>
              <button
                className="btn6"
                onClick={() => {
                  alert("Downloaded exam permit");
                }}
              >
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
              <p className="notice-text1">School ID</p>
              <p className="notice-text1">Exam Permit</p>
              <p className="notice-text1">Black pen</p>
            </div>

            <div className="choices2 back-wrapper">
              <button
                className="btn6"
                onClick={() => (window.location.href = "/")}
              >
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
