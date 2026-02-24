import { useEffect, useState } from "react";
import { useRef } from "react";
import "../../App.css";

function AdmissionInfo() {
  // dropdown menu
  const [menuOpen, setIsMenuOpen] = useState(false);
  const [program, setProgram] = useState("Program");
  const wrapperRef = useRef<HTMLDivElement>(null);

  // second dropdown menu

  const [menuOpen1, setIsMenuOpen1] = useState(false);
  const [program1, setProgram1] = useState("Strand/Course");
  const wrapperRef1 = useRef<HTMLDivElement>(null);

  // available options
  const programOptions = ["College", "Senior High School"];

  const strandOptions: Record<string, string[]> = {
    College: [
      "BSIT - Bachelor of Science in Information Technology",
      "BSCS - Bachelor of Science in Computer Science",
      "BSHM - Bachelor of Science in Hospitality Management",
    ],
    "Senior High School": [
      "STEM - Science, Technology, Engineering, and Mathematics",
      "ABM - Accountancy, Business, and Management",
      "HUMSS - Humanities and Social Sciences",
      "GAS - General Academic Strand",
      "ICT - Information and Communications Technology",
      "HE - Home Economics",
    ],
  };

  // reset the second dropdown if the program selection changes
  useEffect(() => {
    setProgram1("Strand/Course");
  }, [program]);

  //close dropdown menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //close second dropdown menu when clicking outside

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef1.current &&
        !wrapperRef1.current.contains(event.target as Node)
      ) {
        setIsMenuOpen1(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //end of dropdown menu

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
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="example@email.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact">Contact</label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  placeholder="(63+)"
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="lastSchool">Last School Attended</label>
                <input type="text" id="lastSchool" name="lastSchool" required />
              </div>

              <div className="form-group">
                <label htmlFor="yearCompletion">Year Completion</label>
                <input
                  type="text"
                  id="yearCompletion"
                  name="yearCompletion"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="lrn">LRN (Learner Reference Number)</label>
                <input type="text" id="lrn" name="lrn" required />
              </div>
            </div>

            <div className="form-row dropdown-row">
              <div className="dropdown" ref={wrapperRef}>
                <label>Program selection</label>

                <div
                  className="select"
                  onClick={() => setIsMenuOpen((p) => !p)}
                >
                  <span className="selected">{program}</span>
                  <div
                    className={`cart ${menuOpen ? "cart-rotate" : ""}`}
                  ></div>
                </div>

                <ul className={`menu ${menuOpen ? "show" : ""}`}>
                  {programOptions.map((opt) => (
                    <li
                      key={opt}
                      onClick={() => {
                        setProgram(opt);
                        setIsMenuOpen(false);
                      }}
                    >
                      {opt}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="dropdown" ref={wrapperRef1}>
                <label>Strand/Course selection</label>

                <div
                  className="select"
                  onClick={() => setIsMenuOpen1((p) => !p)}
                >
                  <span className="selected">{program1}</span>
                  <div
                    className={`cart ${menuOpen1 ? "cart-rotate" : ""}`}
                  ></div>
                </div>

                <ul className={`menu ${menuOpen1 ? "show" : ""}`}>
                  {(strandOptions[program] || []).map((opt) => (
                    <li
                      key={opt}
                      onClick={() => {
                        setProgram1(opt);
                        setIsMenuOpen1(false);
                      }}
                    >
                      {opt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="choices2">
              <button
                className="btn3"
                onClick={() => (window.location.href = "/enroll")}
              >
                Cancel
              </button>
              <button
                className="btn4"
                onClick={() => (window.location.href = "/requirements")}
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdmissionInfo;
