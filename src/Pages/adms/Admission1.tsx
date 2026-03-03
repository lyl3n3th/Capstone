import "../../App.css";
import { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import Progress from "../../components/Progress";

function Admission1() {
  const [selected, setSelected] = useState<string>("");

  return (
    <div className="container">
      <div className="container1">
        <Progress current={1} />
      </div>

      <div className="mcontainer">
        <div className="header">
          <div className="syb">
            Select Your Branch
            <p>Choose the campus you wish to enroll in</p>
          </div>

          <div
            className={`choices ${selected === "Taytay" ? "selected" : ""}`}
            onClick={() => setSelected("Taytay")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setSelected("Taytay")}
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
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setSelected("Bacoor")}
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
            className={`choices ${selected === "GMA" ? "selected" : ""}`}
            onClick={() => setSelected("GMA")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setSelected("GMA")}
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
              className={`btn2 ${!selected ? "disabled" : ""}`}
              onClick={() => {
                if (selected) {
                  window.location.href = `/information?branch=${selected}`;
                }
              }}
              disabled={!selected}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admission1;
