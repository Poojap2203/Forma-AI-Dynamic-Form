import { useState } from "react";

function ReviewForm({
  incidentData,
  vehicleData,
  onBack,
  onEditIncident,
  onEditVehicle,
  onNewClaim
}) {

  const [submitted, setSubmitted] =
    useState(false);

  const [claimId, setClaimId] =
    useState("");

  const [submittedAt, setSubmittedAt] =
    useState("");


  /* =========================
     SUBMIT CLAIM
     ========================= */

  const handleSubmit = () => {

    /* =========================
       GENERATE CLAIM ID
       ========================= */

    const generatedClaimId =
      "FAI-" +
      Date.now()
        .toString()
        .slice(-8);


    /* =========================
       SUBMISSION TIME
       ========================= */

    const submissionTime =
      new Date().toLocaleString();


    /* =========================
       COMPLETE CLAIM
       ========================= */

    const completeClaim = {

      claimId:
        generatedClaimId,

      status:
        "Submitted",

      submittedAt:
        submissionTime,

      incident:
        incidentData,

      vehicle:
        vehicleData

    };


    /* =========================
       EXISTING CLAIM STORAGE
       ========================= */

    localStorage.setItem(
      "formaAI_claim",
      JSON.stringify(
        completeClaim
      )
    );


    /* =========================
       CLAIM HISTORY
       ========================= */

    const existingClaims =
      JSON.parse(
        localStorage.getItem(
          "formaAI_claims"
        ) || "[]"
      );


    const updatedClaims = [

      ...existingClaims,

      completeClaim

    ];


    localStorage.setItem(
      "formaAI_claims",
      JSON.stringify(
        updatedClaims
      )
    );


    /* =========================
       REMOVE DRAFT AFTER SUBMISSION
       ========================= */

    localStorage.removeItem(
      "formaAI_incident_draft"
    );

    localStorage.removeItem(
      "formaAI_vehicle_draft"
    );

    localStorage.removeItem(
      "formaAI_complete_draft"
    );


    /* =========================
       SUCCESS SCREEN DATA
       ========================= */

    setClaimId(
      generatedClaimId
    );

    setSubmittedAt(
      submissionTime
    );

    setSubmitted(true);

  };


  /* =========================
     SUCCESS SCREEN
     ========================= */

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


          {/* CLAIM INFORMATION */}

          <div className="claim-success-card">

            <div className="claim-success-row">

              <span>
                Claim ID
              </span>

              <strong>
                {claimId}
              </strong>

            </div>


            <div className="claim-success-row">

              <span>
                Status
              </span>

              <strong className="status-submitted">
                ● Submitted
              </strong>

            </div>


            <div className="claim-success-row">

              <span>
                Submitted
              </span>

              <strong>
                {submittedAt}
              </strong>

            </div>

          </div>


          <div className="success-actions">

            <button
              type="button"
              className="secondary-button"
              onClick={() =>
                setSubmitted(false)
              }
            >
              Back to Review
            </button>


            <button
              type="button"
              className="continue"
              onClick={
                onNewClaim
              }
            >
              + Create New Claim
            </button>

          </div>

        </div>

      </div>
    );
  }


  /* =========================
     REVIEW SCREEN
     ========================= */

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
            onClick={
              onEditIncident
            }
          >
            Edit
          </button>

        </div>


        <div className="review-grid">

          <ReviewItem
            label="Incident Type"
            value={
              incidentData?.incidentType
            }
          />

          <ReviewItem
            label="Date"
            value={
              incidentData?.date
            }
          />

          <ReviewItem
            label="Time"
            value={
              incidentData?.time
            }
          />

          <ReviewItem
            label="Location"
            value={
              incidentData?.location
            }
          />

          <ReviewItem
            label="Injury"
            value={
              incidentData?.injured === "yes"
                ? "Yes"
                : incidentData?.injured === "no"
                ? "No"
                : "Not provided"
            }
          />

          <ReviewItem
            label="Police Report"
            value={
              incidentData?.policeReport === "yes"
                ? "Yes"
                : incidentData?.policeReport === "no"
                ? "No"
                : "Not provided"
            }
          />


          {incidentData?.injured === "yes" && (
            <>

              <ReviewItem
                label="Injured Person"
                value={
                  incidentData?.person
                }
              />

              <ReviewItem
                label="Injury Description"
                value={
                  incidentData?.injury
                }
              />

            </>
          )}


          <ReviewItem
            label="Description"
            value={
              incidentData?.description
            }
            full
          />

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
            onClick={
              onEditVehicle
            }
          >
            Edit
          </button>

        </div>


        <div className="review-grid">

          <ReviewItem
            label="Vehicle Make"
            value={
              vehicleData?.vehicleMake
            }
          />

          <ReviewItem
            label="Vehicle Model"
            value={
              vehicleData?.vehicleModel
            }
          />

          <ReviewItem
            label="Registration Number"
            value={
              vehicleData?.registration
            }
          />

          <ReviewItem
            label="Damage Type"
            value={
              vehicleData?.damageType
            }
          />

          <ReviewItem
            label="Damage Severity"
            value={
              vehicleData?.severity
            }
          />

          <ReviewItem
            label="Damage Description"
            value={
              vehicleData?.damageDescription
            }
            full
          />

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
          onClick={
            onBack
          }
        >
          ← Back
        </button>


        <button
          type="button"
          className="continue"
          onClick={
            handleSubmit
          }
        >
          Submit Claim
        </button>

      </div>

    </div>
  );
}


/* =========================
   REVIEW ITEM
   ========================= */

function ReviewItem({
  label,
  value,
  full = false
}) {

  return (
    <div
      className={
        full
          ? "review-item review-full"
          : "review-item"
      }
    >

      <span>
        {label}
      </span>

      <strong>
        {value || "Not provided"}
      </strong>

    </div>
  );
}


export default ReviewForm;