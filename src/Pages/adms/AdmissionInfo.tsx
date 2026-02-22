import "../../App.css";

function AdmissionInfo() {
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

          <div className="step">
            <span className="circle">5</span>
            <p>Entrance Exam</p>
          </div>
        </div>
      </div>

      <div className="mcontainer1">
        <div className="header1">
          <div className="syb">
            Personal Information
            <p>Provide your personal information</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdmissionInfo;
