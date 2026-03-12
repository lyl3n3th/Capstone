import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { FaCircleExclamation } from "react-icons/fa6";
import "../../App.css";
import Progress from "../../components/Progress";
import React, { useState } from "react";

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

  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const groupedRequirements = chunkArray(requirements[studentStatus] || [], 2);

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("trackingNumber", trackingNumber);

    groupedRequirements.flat().forEach((req) => {
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
        alert("Upload failed");
        setIsSubmitting(false);
        return;
      }

      const data = await response.json();
      console.log("Uploaded:", data);

      window.location.href = `/confirmation?branch=${selectedBranch}&status=${studentStatus}&trackingNumber=${trackingNumber}`;
    } catch (err) {
      console.error(err);
      alert("Server error while uploading requirements.");
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    sessionStorage.setItem(
      "enrollmentDraft",
      JSON.stringify({
        branch: selectedBranch,
        status: studentStatus,
        step: 3, // mark that you're at requirements step
        // you can also add any other fields you want to preserve here
      }),
    );

    window.location.href = `/information?branch=${encodeURIComponent(selectedBranch)}&status=${encodeURIComponent(studentStatus)}`;
  };

  const handleContinue = () => {
    window.location.href = `/confirmation?branch=${encodeURIComponent(selectedBranch)}&status=${encodeURIComponent(studentStatus)}`;
  };

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
          </div>

          <form className="Upload-form">
            {groupedRequirements.map((row, rowIndex) => (
              <div className="upload-row" key={rowIndex}>
                {row.map((req, index) => (
                  <div className="upload-group" key={index}>
                    <label htmlFor={req.replace(/\s+/g, "").toLowerCase()}>
                      {req}
                    </label>
                    <label className="file-wrapper">
                      <span className="upload-text">Click to upload {req}</span>
                      <div className="cont-icon">
                        <MdOutlineDriveFolderUpload className="icon" />
                      </div>
                      <input
                        className="file-input"
                        type="file"
                        id={req.replace(/\s+/g, "").toLowerCase()}
                        name={req.replace(/\s+/g, "").toLowerCase()}
                        required
                      />
                    </label>
                  </div>
                ))}
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

            <div className="choices2">
              <button
                className="btn5"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                className="btn6"
                onClick={handleContinue}
                disabled={isSubmitting}
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

export default AdmissionReq;
