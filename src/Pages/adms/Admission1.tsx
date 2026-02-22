import "../../App.css";
import { FaLocationDot } from "react-icons/fa6";

function Admission1() {
  return (
    <div className="container">
      <div className="container1">
        <div className="steps">
          <div className="progress-bar">
            <span className="indicator"></span>
          </div>

          <div className="step">
            <span className="circle">1</span>
            <p>Branches</p>
          </div>

          <div className="step">
            <span className="circle">2</span>
            <p>Information</p>
          </div>

          <div className="step">
            <span className="circle">3</span>
            <p>Requirements</p>
          </div>

          <div className="step">
            <span className="circle">4</span>
            <p>Confirmation</p>
          </div>
        </div>
      </div>

      <div className="mcontainer">
        <div className="header">
          <div className="syb">
            Select Your Branch
            <p>Choose the campus you wish to enroll in</p>
          </div>

          <div className="choices">
            <span className="circle1">
              <FaLocationDot />
            </span>
            <div className="location-text">
              <p className="location">Taytay</p>
              <p className="campus">Taytay campus</p>
            </div>
          </div>

          <div className="choices">
            <span className="circle1">
              <FaLocationDot />
            </span>
            <div className="location-text">
              <p className="location">Bacoor</p>
              <p className="campus">Bacoor campus</p>
            </div>
          </div>

          <div className="choices">
            <span className="circle1">
              <FaLocationDot />
            </span>
            <div className="location-text">
              <p className="location">GMA</p>
              <p className="campus">GMA campus</p>
            </div>
          </div>

          <div className="choices2">
            <button
              className="btn1"
              onClick={() => (window.location.href = "/admission")}
            >
              Cancel
            </button>
            <button className="btn2">Continue</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admission1;
