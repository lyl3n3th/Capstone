import { useEffect, useState } from "react";
import { useRef } from "react";
import "../../App.css";
import Progress from "../../components/Progress";

// get query
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

  //submit handle
  const [isSubmitting, setIsSubmitting] = useState(false);

  //info states
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [mname, setMname] = useState("");
  const [suffix, setSuffix] = useState("");
  const [birthday, setBirthday] = useState("");
  const [pofb, setPofb] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [lastSchool, setLastSchool] = useState("");
  const [yearCompletion, setYearCompletion] = useState("");
  const [lrn, setLrn] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");

  //draft
  const [isLoadingDraft, setIsLoadingDraft] = useState(true);

  //branch admission data
  const selectedBranch = getQueryParam("branch") || "";
  const studentStatus = getQueryParam("status") || "";
  const fromRequirements = getQueryParam("from") === "requirements";

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

  let availablePrograms: string[] = [];

  if (studentStatus === "Junior High Completer") {
    availablePrograms = ["Senior High School"];
  } else if (studentStatus === "Senior High Graduate") {
    availablePrograms =
      selectedBranch.toLowerCase() === "bacoor" ? ["College"] : [];
  } else if (studentStatus === "Transferee") {
    availablePrograms =
      selectedBranch.toLowerCase() === "bacoor"
        ? ["College", "Senior High School"]
        : ["Senior High School"];
  } else {
    availablePrograms =
      selectedBranch.toLowerCase() === "bacoor"
        ? ["College", "Senior High School"]
        : ["Senior High School"];
  }

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

  // Form validation
  const isFormValid = (): boolean => {
    if (program === "Program" || program1 === "Strand/Course") return false;
    if (sex === "Sex") return false;
    if (religion === "Religion") return false;
    if (civilStatus === "Civil Status") return false;
    if (nationality === "Nationality") return false;

    const requiredFields = [
      "fname",
      "lname",
      "birthday",
      "address",
      "email",
      "contact",
      "lastSchool",
      "yearCompletion",
      "lrn",
    ];

    return requiredFields.every((id) => {
      const el = document.getElementById(id) as HTMLInputElement | null;
      return el && el.value.trim() !== "";
    });
  };

  // Save draft to sessionStorage
  const saveDraft = () => {
    const draftData = {
      step: 2,
      trackingNumber,
      branch: selectedBranch,
      status: studentStatus,
      timestamp: new Date().toISOString(),

      // Personal Information
      fname,
      lname,
      middle_name: mname,
      suffix,
      birthday,
      place_of_birth: pofb,
      address,
      email,
      contact,
      last_school_attended: lastSchool,
      year_completion: yearCompletion,
      lrn,

      // Dropdown selections
      program,
      strand_or_course: program1,
      sex,
      religion,
      civil_status: civilStatus,
      nationality,
    };

    sessionStorage.setItem("enrollmentDraft", JSON.stringify(draftData));
  };

  // Load draft from sessionStorage
  const loadDraft = () => {
    const saved = sessionStorage.getItem("enrollmentDraft");
    if (!saved) {
      setIsLoadingDraft(false);
      return;
    }

    try {
      const draft = JSON.parse(saved);

      // Check if draft is for the same branch and status
      if (draft.branch !== selectedBranch || draft.status !== studentStatus) {
        sessionStorage.removeItem("enrollmentDraft");
        setIsLoadingDraft(false);
        return;
      }

      console.log("Loading draft:", draft);

      // Set all text input states
      if (draft.fname) setFname(draft.fname);
      if (draft.lname) setLname(draft.lname);
      if (draft.middle_name) setMname(draft.middle_name);
      if (draft.suffix) setSuffix(draft.suffix);
      if (draft.birthday) setBirthday(draft.birthday);
      if (draft.place_of_birth) setPofb(draft.place_of_birth);
      if (draft.address) setAddress(draft.address);
      if (draft.email) setEmail(draft.email);
      if (draft.contact) setContact(draft.contact);
      if (draft.last_school_attended) setLastSchool(draft.last_school_attended);
      if (draft.year_completion) setYearCompletion(draft.year_completion);
      if (draft.lrn) setLrn(draft.lrn);

      if (draft.sex) setSex(draft.sex);
      if (draft.religion) setReligion(draft.religion);
      if (draft.civil_status) setCivilStatus(draft.civil_status);
      if (draft.nationality) setNationality(draft.nationality);
      if (draft.trackingNumber) setTrackingNumber(draft.trackingNumber);

      if (draft.program) {
        console.log("Setting program to:", draft.program);
        setProgram(draft.program);

        if (draft.strand_or_course) {
          console.log("Will set strand to:", draft.strand_or_course);

          setTimeout(() => {
            console.log("Now setting strand to:", draft.strand_or_course);
            setProgram1(draft.strand_or_course);
          }, 100);
        }
      }
    } catch (err) {
      console.warn("Failed to load draft", err);
    } finally {
      setIsLoadingDraft(false);
    }
  };

  useEffect(() => {
    if (fromRequirements) {
      console.log("Returning from requirements, reloading draft...");
      loadDraft();
    }
  }, [fromRequirements]);

  // Auto-save draft
  useEffect(() => {
    if (!isLoadingDraft) {
      const timeoutId = setTimeout(() => {
        saveDraft();
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [
    fname,
    lname,
    mname,
    suffix,
    birthday,
    pofb,
    address,
    email,
    contact,
    lastSchool,
    yearCompletion,
    lrn,
    program,
    program1,
    sex,
    religion,
    civilStatus,
    nationality,
    trackingNumber,
  ]);

  // Load draft on mount
  useEffect(() => {
    loadDraft();
  }, []);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    switch (id) {
      case "fname":
        setFname(value);
        break;
      case "lname":
        setLname(value);
        break;
      case "mname":
        setMname(value);
        break;
      case "suffix":
        setSuffix(value);
        break;
      case "birthday":
        setBirthday(value);
        break;
      case "pofb":
        setPofb(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "contact":
        setContact(value);
        break;
      case "lastSchool":
        setLastSchool(value);
        break;
      case "yearCompletion":
        setYearCompletion(value);
        break;
      case "lrn":
        setLrn(value);
        break;
    }
  };

  const handleContinue = async () => {
    if (!isFormValid()) {
      alert("Please complete all required fields.");
      return;
    }

    setIsSubmitting(true);
    saveDraft();

    const payload = {
      first_name: fname,
      last_name: lname,
      middle_name: mname,
      suffix: suffix,
      birthday: birthday,
      place_of_birth: pofb,
      sex,
      religion,
      civil_status: civilStatus,
      nationality,
      address: address,
      email: email,
      contact: contact,
      last_school_attended: lastSchool,
      year_completion: yearCompletion,
      lrn: lrn,
      program,
      strand_or_course: program1,
      branch: selectedBranch,
      student_status: studentStatus,
    };

    try {
      const response = await fetch("/api/admissions/step2/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(
          "Validation error: " + JSON.stringify(data.errors || data, null, 2),
        );
        setIsSubmitting(false);
        return;
      }

      if (data.tracking_number) {
        setTrackingNumber(data.tracking_number);

        const currentDraft = JSON.parse(
          sessionStorage.getItem("enrollmentDraft") || "{}",
        );

        const updatedDraft = {
          ...currentDraft,
          trackingNumber: data.tracking_number,
          step: 2.5,
          timestamp: new Date().toISOString(),

          fname,
          lname,
          mname,
          suffix,
          birthday,
          pofb,
          address,
          email,
          contact,
          lastSchool,
          yearCompletion,
          lrn,
          program,
          strand_or_course: program1,
          sex,
          religion,
          civil_status: civilStatus,
          nationality,
          branch: selectedBranch,
          status: studentStatus,
        };

        sessionStorage.setItem("enrollmentDraft", JSON.stringify(updatedDraft));
        console.log("Draft saved before navigation:", updatedDraft);
      }

      window.location.href = `/requirements?branch=${encodeURIComponent(selectedBranch)}&status=${encodeURIComponent(studentStatus)}&trackingNumber=${data.tracking_number || trackingNumber}`;
    } catch (err) {
      console.error(err);
      alert("Cannot connect to server. Please check your connection.");
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    // Save
    saveDraft();

    const draft = sessionStorage.getItem("enrollmentDraft");
    let branch = selectedBranch;
    let status = studentStatus;

    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        branch = parsed.branch || selectedBranch;
        status = parsed.status || studentStatus;
      } catch (err) {
        console.warn("Failed to parse draft", err);
      }
    }

    console.log("Navigating back to step 1 with:", { branch, status });
    window.location.href = `/enroll?from=information`;
  };

  const handleClearDraft = () => {
    if (window.confirm("Are you sure you want to clear all form data?")) {
      sessionStorage.removeItem("enrollmentDraft");
      window.location.reload();
    }
  };

  // Reset if non-bacoor
  useEffect(() => {
    if (program === "College" && selectedBranch.toLowerCase() !== "bacoor") {
      setProgram("Program");
      alert("College programs are only available at Bacoor branch.");
    }
  }, [program, selectedBranch]);

  // Reset the second dropdown if the program selection changes
  useEffect(() => {
    setProgram1("Strand/Course");
  }, [program]);

  // Close dropdown menu when clicking outside (ALL YOUR ORIGINAL HANDLERS)
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isLoadingDraft) {
    return <div className="container">Loading saved data...</div>;
  }

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
                {selectedBranch || "—"}
              </strong>
              <br />
            </p>
            <p>Please fill in all the required fields. </p>
          </div>

          <form action="" className="pinfo">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fname">
                  First Name <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  required
                  value={fname}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="lname">
                  Last Name <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  id="lname"
                  name="lname"
                  required
                  value={lname}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="mname">Middle Name</label>
                <input
                  type="text"
                  id="mname"
                  name="mname"
                  value={mname}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="suffix">Suffix</label>
                <input
                  type="text"
                  id="suffix"
                  name="suffix"
                  value={suffix}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="birthday">
                  Birthday <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="date"
                  id="birthday"
                  name="birthday"
                  required
                  value={birthday}
                  onChange={handleInputChange}
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="pofb">Place of Birth</label>
                <input
                  type="text"
                  id="pofb"
                  name="pofb"
                  value={pofb}
                  onChange={handleInputChange}
                />
              </div>

              <div className="dropdown" ref={wrapperRefSex}>
                <label>
                  Sex <span style={{ color: "red" }}>*</span>
                </label>
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
                <label>
                  Religion <span style={{ color: "red" }}>*</span>
                </label>
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
                <label>
                  Civil Status <span style={{ color: "red" }}>*</span>
                </label>
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
                <label>
                  Nationality <span style={{ color: "red" }}>*</span>
                </label>
                <div
                  className="select"
                  onClick={() => setIsMenuOpenNat((p) => !p)}
                >
                  <span className="selected">{nationality}</span>
                  <div
                    className={`cart ${menuOpenNat ? "cart-rotate" : ""}`}
                  ></div>
                </div>
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
                <label htmlFor="address">
                  Address <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  className="address-input"
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Street Address, City, Province, ZIP Code"
                  required
                  value={address}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">
                  Email <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="example@email.com"
                  required
                  value={email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact">
                  Contact <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="tel"
                  id="contact"
                  name="contact"
                  placeholder="(63+)"
                  required
                  value={contact}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="lastSchool">
                  Last School Attended <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  id="lastSchool"
                  name="lastSchool"
                  required
                  value={lastSchool}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="yearCompletion">
                  Year Completion <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  id="yearCompletion"
                  name="yearCompletion"
                  placeholder="YYYY"
                  required
                  value={yearCompletion}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="lrn">
                  LRN <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  id="lrn"
                  name="lrn"
                  placeholder="12-digit number"
                  required
                  value={lrn}
                  onChange={handleInputChange}
                  maxLength={12}
                />
              </div>
            </div>

            <div className="form-row dropdown-row">
              <div className="dropdown" ref={wrapperRef}>
                <label>
                  Program selection <span style={{ color: "red" }}>*</span>
                </label>
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
                  {availablePrograms.length > 0 ? (
                    availablePrograms.map((opt) => (
                      <li
                        key={opt}
                        onClick={() => {
                          setProgram(opt);
                          setIsMenuOpen(false);
                        }}
                      >
                        {opt}
                      </li>
                    ))
                  ) : (
                    <li className="disabled">
                      No programs available for this branch/status
                    </li>
                  )}
                </ul>
              </div>

              <div className="dropdown" ref={wrapperRef1}>
                <label>
                  Strand / Course selection{" "}
                  <span style={{ color: "red" }}>*</span>
                </label>
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
                        saveDraft();
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
                type="button"
                className="btn3"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="button"
                className={`btn4 ${!isFormValid() || isSubmitting ? "disabled" : ""}`}
                onClick={handleContinue}
                disabled={!isFormValid() || isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Continue"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdmissionInfo;
