import { FaRegPaperPlane } from "react-icons/fa6";
import "../../App.css";
import logow from "../../assets/images/logow.png";

function AdmissionHome() {
  return (
    <section className="hero">
      <div className="content">
        <h1>
          Asian Institute of <br />
          Computer Studies
        </h1>

        <p>Go Beyond Learning</p>
        <p id="p2">ADMISSION PORTAL</p>

        <a href="#">Enroll Now</a>
        <img src={logow} alt="logo" className="logo"></img>

        <div className="form-container">
          <input
            type="text"
            placeholder="Input Tracking Number"
            className="input-field"
          />
        </div>

        <div className="track-container">
          <a href="#" className="track-cont">
            <FaRegPaperPlane />
          </a>
        </div>
      </div>
    </section>
  );
}

export default AdmissionHome;
