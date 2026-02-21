import "../../App.css";

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
        </div>
      </div>
    </div>
  );
}

export default Admission1;
