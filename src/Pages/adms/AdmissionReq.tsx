import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { FaCircleExclamation } from "react-icons/fa6";
import "../../App.css";
import Progress from "../../components/Progress";

function AdmissionReq() {
  return (
    <div className="container">
      <div className="container1">
        <Progress current={3} />
      </div>

      <div className="mcontainer">
        <div className="header2">
          <div className="syb">
            Upload Requirements
            <p>Upload the necessary documents to complete your application.</p>
          </div>

          <form className="Upload-form">
            <div className="upload-row">
              <div className="upload-group">
                <label htmlFor="form137" className="label-1">
                  Form 137
                </label>
                <label className="file-wrapper">
                  <span className="upload-text">Click to upload form 137</span>
                  <div className="cont-icon">
                    <MdOutlineDriveFolderUpload className="icon" />
                  </div>
                  <input
                    className="file-input"
                    type="file"
                    id="form137"
                    name="form137"
                    required
                  />
                </label>
              </div>

              <div className="upload-group">
                <label htmlFor="gradeCard">Grade Report Card</label>
                <label className="file-wrapper">
                  <span className="upload-text">
                    Click to upload grade report card
                  </span>
                  <div className="cont-icon">
                    <MdOutlineDriveFolderUpload className="icon" />
                  </div>
                  <input
                    className="file-input"
                    type="file"
                    id="gradeCard"
                    name="gradeCard"
                    required
                  />
                </label>
              </div>
            </div>

            <div className="upload-row">
              <div className="upload-group">
                <label htmlFor="form137" className="label-1">
                  Birth Certificate/PSA
                </label>
                <label className="file-wrapper">
                  <span className="upload-text">
                    Click to upload birth certificate/PSA
                  </span>
                  <div className="cont-icon">
                    <MdOutlineDriveFolderUpload className="icon" />
                  </div>
                  <input
                    className="file-input"
                    type="file"
                    id="birthCertificate"
                    name="birthCertificate"
                    required
                  />
                </label>
              </div>

              <div className="upload-group">
                <label htmlFor="goodMoral">Good Moral Character</label>
                <label className="file-wrapper">
                  <span className="upload-text">
                    Click to upload good moral character
                  </span>
                  <div className="cont-icon">
                    <MdOutlineDriveFolderUpload className="icon" />
                  </div>
                  <input
                    className="file-input"
                    type="file"
                    id="goodMoral"
                    name="goodMoral"
                    required
                  />
                </label>
              </div>
            </div>

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
                onClick={() => (window.location.href = "/information")}
              >
                Cancel
              </button>
              <button
                className="btn6"
                onClick={() => (window.location.href = "/confirmation")}
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
