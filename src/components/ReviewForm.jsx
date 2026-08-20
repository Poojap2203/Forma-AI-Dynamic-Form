import { useState } from "react";
function ReviewForm({
  onBack,
  onEditIncident,
  onEditVehicle
}) {

  const [submitted, setSubmitted] = useState(false);


  const handleSubmit = () => {
    setSubmitted(true);
  };


  if (submitted) {
    return (
      <div className="form-card">

        <div className="success-container">

          <div className="success-icon">
            ✓
          </div>

          <h2>Claim Submitted Successfully</h2>

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


      {/* HEADING */}

      <div className="form-heading">

        <div className="form-icon">
          ✓
        </div>

        <div>

          <h2>Review & Submit</h2>

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

            <span>
              Incident Type
            </span>

            <strong>
              Road Accident
            </strong>

          </div>


          <div className="review-item">

            <span>
              Date
            </span>

            <strong>
              Not provided
            </strong>

          </div>


          <div className="review-item">

            <span>
              Time
            </span>

            <strong>
              Not provided
            </strong>

          </div>


          <div className="review-item">

            <span>
              Location
            </span>

            <strong>
              Not provided
            </strong>

          </div>


          <div className="review-item">

            <span>
              Injury
            </span>

            <strong>
              Not provided
            </strong>

          </div>


          <div className="review-item">

            <span>
              Police Report
            </span>

            <strong>
              Not provided
            </strong>

          </div>

        </div>

      </div>



      {/*VEHICLE DETAILS*/}

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

            <span>
              Vehicle Make
            </span>

            <strong>
              Not provided
            </strong>

          </div>


          <div className="review-item">

            <span>
              Vehicle Model
            </span>

            <strong>
              Not provided
            </strong>

          </div>


          <div className="review-item">

            <span>
              Registration Number
            </span>

            <strong>
              Not provided
            </strong>

          </div>


          <div className="review-item">

            <span>
              Damage Type
            </span>

            <strong>
              Not provided
            </strong>

          </div>


          <div className="review-item">

            <span>
              Damage Severity
            </span>

            <strong>
              Not provided
            </strong>

          </div>

        </div>

      </div>



      {/*SUBMIT WARNING */}

      <div className="review-notice">

        <strong>
          Before you submit
        </strong>

        <p>
          Please make sure all the information
          provided above is correct.
        </p>

      </div>



      {/*BUTTONS */}

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