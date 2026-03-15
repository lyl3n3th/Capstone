import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { FaCircleExclamation } from "react-icons/fa6";
import "../../App.css";
import Progress from "../../components/Progress";
import React, { useState, useEffect } from "react";

function getQueryParam(name: string): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function chunkArray(arr: string[], size: number) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

function AdmissionReq() {
  const selectedBranch = getQueryParam("branch") || "";
  const studentStatus = getQueryParam("status") || "";
  const trackingNumber = getQueryParam("trackingNumber") || "";
  // Add program from URL params
  const program = getQueryParam("program") || "";

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, string>>(
    {},
  );

  // Load and verify draft data on component mount
  useEffect(() => {
    const draft = sessionStorage.getItem("enrollmentDraft");
    if (draft) {
      try {
        const parsedDraft = JSON.parse(draft);
        console.log("Draft loaded in requirements page:", {
          fname: parsedDraft.fname,
          lname: parsedDraft.lname,
          program: parsedDraft.program,
          strand: parsedDraft.strand_or_course,
          trackingNumber: parsedDraft.trackingNumber,
        });
      } catch (err) {
        console.warn("Failed to parse draft", err);
      }
    }
  }, []);

  // Requirements
  const requirements: Record<string, string[]> = {
    "Junior High Completer": [
      "Form 137",
      "Grade Report Card",
      "Birth Certificate/PSA",
      "Good Moral Character",
    ],
    "Senior High Graduate": [
      "Form 137",
      "Diploma/Certificate of Graduation",
      "Birth Certificate/PSA",
      "Good Moral Character",
    ],
    Transferee: [
      "Transcript of Records (TOR)",
      "Honorable Dismissal",
      "Birth Certificate/PSA",
      "Good Moral Character",
    ],
    "Foreign Student": [
      "Passport",
      "Visa",
      "Birth Certificate/PSA",
      "Good Moral Character",
    ],
    "Cross-Registrant": [
      "Permit to Cross-Register",
      "Current School ID",
      "Birth Certificate/PSA",
      "Good Moral Character",
    ],
  };

  const currentRequirements = requirements[studentStatus] || [];
  const groupedRequirements = chunkArray(currentRequirements, 2);

  // Handle file selection
  const handleFileChange = (
    req: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFiles((prev) => ({
        ...prev,
        [req]: file.name,
      }));
    }
  };

  // Function to continue without uploading
  const handleContinueWithoutUpload = () => {
    // Update draft to mark step 3 as completed without uploads
    const existing = sessionStorage.getItem("enrollmentDraft");
    if (existing) {
      const draft = JSON.parse(existing);
      const updated = {
        ...draft,
        step: 3,
        requirementsSkipped: true,
        timestamp: draft.timestamp || new Date().toISOString(),
      };
      sessionStorage.setItem("enrollmentDraft", JSON.stringify(updated));
    }

    // Navigate to confirmation page WITH program parameter
    window.location.href = `/confirmation?branch=${encodeURIComponent(selectedBranch)}&status=${encodeURIComponent(studentStatus)}&trackingNumber=${trackingNumber}&program=${encodeURIComponent(program)}`;
  };

  // Submit handler (for when files are actually uploaded)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if any files are selected
    const hasFiles = currentRequirements.some((req) => {
      const input = document.getElementById(
        req.replace(/\s+/g, "").toLowerCase(),
      ) as HTMLInputElement;
      return input?.files?.[0] != null;
    });

    // If no files, just continue without uploading
    if (!hasFiles) {
      handleContinueWithoutUpload();
      return;
    }

    // Otherwise, proceed with upload
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("trackingNumber", trackingNumber);

    // Append files that were selected
    currentRequirements.forEach((req) => {
      const input = document.getElementById(
        req.replace(/\s+/g, "").toLowerCase(),
      ) as HTMLInputElement;
      if (input?.files?.[0]) {
        formData.append(req, input.files[0]);
      }
    });

    try {
      const response = await fetch("/api/admissions/requirements/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        alert("Upload failed. You can continue without uploading for now.");
        // Still allow continuing even if upload fails
        handleContinueWithoutUpload();
        return;
      }

      const data = await response.json();
      console.log("Uploaded:", data);

      // Update draft to mark step 3 as completed
      const existing = sessionStorage.getItem("enrollmentDraft");
      if (existing) {
        const draft = JSON.parse(existing);
        const updated = {
          ...draft,
          step: 3,
          requirementsUploaded: true,
          timestamp: draft.timestamp || new Date().toISOString(),
        };
        sessionStorage.setItem("enrollmentDraft", JSON.stringify(updated));
      }

      // Navigate to confirmation page WITH program parameter
      window.location.href = `/confirmation?branch=${encodeURIComponent(selectedBranch)}&status=${encodeURIComponent(studentStatus)}&trackingNumber=${trackingNumber}&program=${encodeURIComponent(program)}`;
    } catch (err) {
      console.error(err);
      alert("Server error. Continuing without upload...");
      handleContinueWithoutUpload();
    }
  };

  const handleCancel = () => {
    // Get existing draft - this contains all the data from step 2
    const existing = sessionStorage.getItem("enrollmentDraft");
    let draft = existing ? JSON.parse(existing) : {};

    console.log("Preserving draft data on cancel:", {
      fname: draft.fname,
      lname: draft.lname,
      program: draft.program,
      strand: draft.strand_or_course,
    });

    // Make sure we preserve ALL data when navigating back
    const updatedDraft = {
      ...draft, // This preserves everything from step 2
      step: 2, // Go back to step 2
      lastVisited: new Date().toISOString(),
      branch: selectedBranch,
      status: studentStatus,
      trackingNumber: trackingNumber || draft.trackingNumber,
    };

    sessionStorage.setItem("enrollmentDraft", JSON.stringify(updatedDraft));

    // Navigate back to information page WITH program parameter
    window.location.href = `/information?branch=${encodeURIComponent(selectedBranch)}&status=${encodeURIComponent(studentStatus)}&trackingNumber=${trackingNumber || draft.trackingNumber}&program=${encodeURIComponent(program)}&from=requirements`;
  };

  // If no requirements for this status
  if (currentRequirements.length === 0) {
    return (
      <div className="container">
        <div className="container1">
          <Progress current={3} />
        </div>
        <div className="mcontainer mcnt">
          <div className="header2">
            <div className="syb">
              Upload Requirements
              <p>No requirements found for {studentStatus} status.</p>
            </div>
            <div className="choices2">
              <button className="btn5" onClick={handleCancel}>
                Cancel
              </button>
              <button className="btn6" onClick={handleContinueWithoutUpload}>
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="container1">
        <Progress current={3} />
      </div>

      <div className="mcontainer mcnt">
        <div className="header2">
          <div className="syb">
            Upload Requirements
            <p>Upload the necessary documents to complete your application.</p>
            {/* Optional: Show program info */}
          </div>

          <form className="Upload-form" onSubmit={handleSubmit}>
            {groupedRequirements.map((row, rowIndex) => (
              <div className="upload-row" key={rowIndex}>
                {row.map((req, index) => {
                  const inputId = req.replace(/\s+/g, "").toLowerCase();
                  return (
                    <div className="upload-group" key={index}>
                      <label htmlFor={inputId}>
                        {req}{" "}
                        <span
                          style={{ color: "#666", fontSize: "12px" }}
                        ></span>
                      </label>
                      <label className="file-wrapper">
                        <span className="upload-text">
                          {uploadedFiles[req]
                            ? `📎 ${uploadedFiles[req]}`
                            : `Click to upload ${req} (optional)`}
                        </span>
                        <div className="cont-icon">
                          <MdOutlineDriveFolderUpload className="icon" />
                        </div>
                        <input
                          className="file-input"
                          type="file"
                          id={inputId}
                          name={inputId}
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileChange(req, e)}
                        />
                      </label>
                    </div>
                  );
                })}
              </div>
            ))}

            <div className="choices-note">
              <div className="note-header">
                <FaCircleExclamation className="exclamation-icon" />
                <p className="note">Important Notes:</p>
              </div>

              <p className="notice-text">
                All Documents must be clear and readable
              </p>
              <p className="notice-text">
                Files should be in PDF or image format (JPG, PNG)
              </p>
              <p className="notice-text">Maximum file size: 5MB per document</p>
              <p className="notice-text">
                You will need to bring physical copies on your schedule visit
              </p>
            </div>

            <div
              className="choices2 reqcho"
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "flex-end",
              }}
            >
              <button
                type="button"
                className="btn5"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn6"
                onClick={handleContinueWithoutUpload}
                disabled={isSubmitting}
                style={{ backgroundColor: "#1A3D5C" }}
              >
                Continue without uploading
              </button>
              <button type="submit" className="btn6" disabled={isSubmitting}>
                {isSubmitting ? "Uploading..." : "Upload & Continue"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdmissionReq;
