import { useEffect, useState } from "react";
import { useRef } from "react";
import "../../App.css";
import Progress from "../../components/Progress";

// get qeury
function getQueryParam(name: string): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function AdmissionInfo() {
  // Program dropdown menu
  const [menuOpen, setIsMenuOpen] = useState(false);
  const [program, setProgram] = useState("Program");
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Strand/Course second dropdown menu
  const [menuOpen1, setIsMenuOpen1] = useState(false);
  const [program1, setProgram1] = useState("Strand/Course");
  const wrapperRef1 = useRef<HTMLDivElement>(null);

  // Religion Drop down
  const [menuOpenRel, setIsMenuOpenRel] = useState(false);
  const [religion, setReligion] = useState("Religion");
  const wrapperRefRel = useRef<HTMLDivElement>(null);

  // Civil Drop down
  const [menuOpenCS, setIsMenuOpenCS] = useState(false);
  const [civilStatus, setCivilStatus] = useState("Civil Status");
  const wrapperRefCS = useRef<HTMLDivElement>(null);

  //Nationality drop down
  const [menuOpenNat, setIsMenuOpenNat] = useState(false);
  const [nationality, setNationality] = useState("Nationality");
  const wrapperRefNat = useRef<HTMLDivElement>(null);

  //Sex drop down

  const [menuOpenSex, setIsMenuOpenSex] = useState(false);
  const [sex, setSex] = useState("Sex");
  const wrapperRefSex = useRef<HTMLDivElement>(null);

  // available options
  const programOptions = ["College", "Senior High School"];

  const sexOptions = ["Male", "Female"];
  const religionOptions = ["Roman Catholic", "Christian", "Muslim", "Others"];
  const civilStatusOptions = ["Single", "Married", "Widowed", "Separated"];
  const nationalityOptions = [
    "American",
    "Australian",
    "Brazilian",
    "British",
    "Canadian",
    "Chinese",
    "Filipino",
    "French",
    "German",
    "Indian",
    "Indonesian",
    "Italian",
    "Japanese",
    "Korean",
    "Malaysian",
    "Mexican",
    "Singaporean",
    "Spanish",
    "Thai",
    "Vietnamese",
  ];

  const selectedBranch = getQueryParam("branch") || ""; // "Taytay", "Bacoor", "GMA"

  const availablePrograms =
    selectedBranch.toLowerCase() === "bacoor"
      ? ["College", "Senior High School"]
      : ["Senior High School"]; // Taytay & GMA only SHS

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
  //reset if non-bacoor
  useEffect(() => {
    if (program === "College" && selectedBranch.toLowerCase() !== "bacoor") {
      setProgram("Program");
      alert("College programs are only available at Bacoor branch.");
    }
  }, [program, selectedBranch]);

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

  //Religion Close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRefRel.current &&
        !wrapperRefRel.current.contains(event.target as Node)
      ) {
        setIsMenuOpenRel(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //Civil Close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRefCS.current &&
        !wrapperRefCS.current.contains(event.target as Node)
      ) {
        setIsMenuOpenCS(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //Nationality close

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRefNat.current &&
        !wrapperRefNat.current.contains(event.target as Node)
      ) {
        setIsMenuOpenNat(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // sex close

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRefSex.current &&
        !wrapperRefSex.current.contains(event.target as Node)
      ) {
        setIsMenuOpenSex(false);
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
        <Progress current={2} />
      </div>

      <div className="mcontainer1">
        <div className="header1">
          <div className="syb">
            Personal Information
            <p>
              Branch selected:{" "}
              <strong style={{ margin: "4px", color: "#1A3D5C" }}>
                {" "}
                {selectedBranch || "—"}
              </strong>
              <br />
            </p>
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

              <div className="form-group">
                <label htmlFor="suffix">Suffix</label>
                <input type="text" id="suffix" name="suffix" />
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
                <label htmlFor="pofb">Place of Birth</label>
                <input type="text" id="pofb" name="pofb" />
              </div>

              <div className="dropdown" ref={wrapperRefSex}>
                <label>Sex</label>
                <div
                  className="select"
                  onClick={() => setIsMenuOpenSex((p) => !p)}
                >
                  <span className="selected">{sex}</span>
                  <div
                    className={`cart ${menuOpenSex ? "cart-rotate" : ""}`}
                  ></div>
                </div>
                <ul className={`menu ${menuOpenSex ? "show" : ""}`}>
                  {sexOptions.map((opt) => (
                    <li
                      key={opt}
                      onClick={() => {
                        setSex(opt);
                        setIsMenuOpenSex(false);
                      }}
                    >
                      {opt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="form-row">
              <div className="dropdown" ref={wrapperRefRel}>
                <label>Religion</label>
                <div
                  className="select"
                  onClick={() => setIsMenuOpenRel((p) => !p)}
                >
                  <span className="selected">{religion}</span>
                  <div
                    className={`cart ${menuOpenRel ? "cart-rotate" : ""}`}
                  ></div>
                </div>
                <ul className={`menu ${menuOpenRel ? "show" : ""}`}>
                  {religionOptions.map((opt) => (
                    <li
                      key={opt}
                      onClick={() => {
                        setReligion(opt);
                        setIsMenuOpenRel(false);
                      }}
                    >
                      {opt}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="dropdown" ref={wrapperRefCS}>
                <label>Civil Status</label>
                <div
                  className="select"
                  onClick={() => setIsMenuOpenCS((p) => !p)}
                >
                  <span className="selected">{civilStatus}</span>
                  <div
                    className={`cart ${menuOpenCS ? "cart-rotate" : ""}`}
                  ></div>
                </div>
                <ul className={`menu ${menuOpenCS ? "show" : ""}`}>
                  {civilStatusOptions.map((opt) => (
                    <li
                      key={opt}
                      onClick={() => {
                        setCivilStatus(opt);
                        setIsMenuOpenCS(false);
                      }}
                    >
                      {opt}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="dropdown" ref={wrapperRefNat}>
                <label>Nationality</label>
                <div
                  className="select"
                  onClick={() => setIsMenuOpenNat((p) => !p)}
                >
                  <span className="selected">{nationality}</span>
                  <div
                    className={`cart ${menuOpenNat ? "cart-rotate" : ""}`}
                  ></div>{" "}
                </div>{" "}
                <ul className={`menu ${menuOpenNat ? "show" : ""}`}>
                  {nationalityOptions.map((opt) => (
                    <li
                      key={opt}
                      onClick={() => {
                        setNationality(opt);
                        setIsMenuOpenNat(false);
                      }}
                    >
                      {opt}
                    </li>
                  ))}
                </ul>
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
                  {availablePrograms.map((opt) => (
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
                <label>Strand / Course selection</label>

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

            <div className="choices3">
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
