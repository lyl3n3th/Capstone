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
            <p>Please fill in all the required fields.</p>
          </div>

          <form action="" className="pinfo">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fname">First Name</label>
                <input type="text" id="fname" name="fname" required />
              </div>

              <div className="form-group">
                <label htmlFor="lname">Last Name</label>
                <input type="text" id="lname" name="lname" required />
              </div>

              <div className="form-group">
                <label htmlFor="mname">Middle Name</label>
                <input type="text" id="mname" name="mname" required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="birthday">Birthday</label>
                <input
                  type="text"
                  id="birthday"
                  name="birthday"
                  placeholder="MM/DD/YYYY"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="sex">Sex</label>
                <input type="text" id="sex" name="sex" required />
              </div>

              <div className="form-group">
                <label htmlFor="suffix">Suffix</label>
                <input type="text" id="suffix" name="suffix" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  className="address-input"
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Street Address, City, Province, ZIP Code"
                  required
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdmissionInfo;
