import { useState } from "react";

function ReviewForm({
  incidentData,
  vehicleData,
  onBack,
  onEditIncident,
  onEditVehicle
}) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    const completeClaim = {
      incident: incidentData,
      vehicle: vehicleData
    };

    localStorage.setItem(
      "formaAI_claim",
      JSON.stringify(completeClaim)
    );

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="form-card">
        <div className="success-container">

          <div className="success-icon">
            ✓
          </div>

          <h2>
            Claim Submitted Successfully
          </h2>

          <p>
            Your insurance claim has been submitted
            for review.
          </p>

          <button
            type="button"
            className="continue"
            onClick={() => setSubmitted(false)}
          >
            Back to Review
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="form-card">

      {/* HEADER */}

      <div className="form-heading">

        <div className="form-icon">
          ✓
        </div>

        <div>
          <h2>
            Review & Submit
          </h2>

          <p>
            Review your information before submitting.
          </p>
        </div>

      </div>


      {/* INCIDENT DETAILS */}

      <div className="review-section">

        <div className="review-header">

          <h3>
            Incident Details
          </h3>

          <button
            type="button"
            className="edit-button"
            onClick={onEditIncident}
          >
            Edit
          </button>

        </div>


        <div className="review-grid">

          <div className="review-item">
            <span>Incident Type</span>
            <strong>
              {incidentData?.incidentType || "Not provided"}
            </strong>
          </div>


          <div className="review-item">
            <span>Date</span>
            <strong>
              {incidentData?.date || "Not provided"}
            </strong>
          </div>


          <div className="review-item">
            <span>Time</span>
            <strong>
              {incidentData?.time || "Not provided"}
            </strong>
          </div>


          <div className="review-item">
            <span>Location</span>
            <strong>
              {incidentData?.location || "Not provided"}
            </strong>
          </div>


          <div className="review-item">
            <span>Injury</span>
            <strong>
              {incidentData?.injured === "yes"
                ? "Yes"
                : incidentData?.injured === "no"
                ? "No"
                : "Not provided"}
            </strong>
          </div>


          <div className="review-item">
            <span>Police Report</span>
            <strong>
              {incidentData?.policeReport === "yes"
                ? "Yes"
                : incidentData?.policeReport === "no"
                ? "No"
                : "Not provided"}
            </strong>
          </div>


          {incidentData?.injured === "yes" && (
            <>
              <div className="review-item">
                <span>Injured Person</span>
                <strong>
                  {incidentData?.person || "Not provided"}
                </strong>
              </div>

              <div className="review-item">
                <span>Injury Description</span>
                <strong>
                  {incidentData?.injury || "Not provided"}
                </strong>
              </div>
            </>
          )}


          <div className="review-item review-full">
            <span>Description</span>
            <strong>
              {incidentData?.description || "Not provided"}
            </strong>
          </div>

        </div>

      </div>


      {/* VEHICLE & DAMAGE */}

      <div className="review-section">

        <div className="review-header">

          <h3>
            Vehicle & Damage
          </h3>

          <button
            type="button"
            className="edit-button"
            onClick={onEditVehicle}
          >
            Edit
          </button>

        </div>


        <div className="review-grid">

          <div className="review-item">
            <span>Vehicle Make</span>
            <strong>
              {vehicleData?.vehicleMake || "Not provided"}
            </strong>
          </div>


          <div className="review-item">
            <span>Vehicle Model</span>
            <strong>
              {vehicleData?.vehicleModel || "Not provided"}
            </strong>
          </div>


          <div className="review-item">
            <span>Registration Number</span>
            <strong>
              {vehicleData?.registration || "Not provided"}
            </strong>
          </div>


          <div className="review-item">
            <span>Damage Type</span>
            <strong>
              {vehicleData?.damageType || "Not provided"}
            </strong>
          </div>


          <div className="review-item">
            <span>Damage Severity</span>
            <strong>
              {vehicleData?.severity || "Not provided"}
            </strong>
          </div>


          <div className="review-item review-full">
            <span>Damage Description</span>
            <strong>
              {vehicleData?.damageDescription || "Not provided"}
            </strong>
          </div>

        </div>

      </div>


      {/* NOTICE */}

      <div className="review-notice">

        <strong>
          Before you submit
        </strong>

        <p>
          Please make sure all the information
          provided above is correct.
        </p>

      </div>


      {/* BUTTONS */}

      <div className="form-buttons">

        <button
          type="button"
          className="secondary-button"
          onClick={onBack}
        >
          ← Back
        </button>

        <button
          type="button"
          className="continue"
          onClick={handleSubmit}
        >
          Submit Claim
        </button>

      </div>

    </div>
  );
}

export default ReviewForm;