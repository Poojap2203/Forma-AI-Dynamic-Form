function AISummary({ formData }) {
const hasValue = (value) => {
    return value && value.trim() !== "";
  };

  return (
    <div className="ai-summary">

      <div className="summary-header">

        <div>

          <h3>
            ✨ AI Extracted Summary
          </h3>

          <p>
            Details will appear here as you complete the form.
          </p>

        </div>

        <div className="summary-score">
          95%
        </div>

      </div>


      <div className="robot-box">
        🤖
      </div>


      {/* INCIDENT */}

      <div className="summary-item">

        <div className="summary-icon">
          🚗
        </div>

        <div>

          <span>
            Incident Type
          </span>

          <strong>
            {hasValue(formData?.incidentType)
              ? formData.incidentType
              : "Not provided"}
          </strong>

        </div>

        <div className="check">
          {hasValue(formData?.incidentType) ? "✓" : "—"}
        </div>

      </div>


      {/* DATE */}

      <div className="summary-item">

        <div className="summary-icon">
          📅
        </div>

        <div>

          <span>
            Date & Time
          </span>

          <strong>

            {hasValue(formData?.date)
              ? formData.date
              : "Not provided"}

            {hasValue(formData?.time)
              ? `, ${formData.time}`
              : ""}

          </strong>

        </div>

        <div className="check">
          {hasValue(formData?.date) ? "✓" : "—"}
        </div>

      </div>


      {/* LOCATION */}

      <div className="summary-item">

        <div className="summary-icon">
          📍
        </div>

        <div>

          <span>
            Location
          </span>

          <strong>
            {hasValue(formData?.location)
              ? formData.location
              : "Not provided"}
          </strong>

        </div>

        <div className="check">
          {hasValue(formData?.location) ? "✓" : "—"}
        </div>

      </div>


      {/* VEHICLE */}

      <div className="summary-item">

        <div className="summary-icon">
          🚘
        </div>

        <div>

          <span>
            Vehicle
          </span>

          <strong>
            {hasValue(formData?.vehicle)
              ? formData.vehicle
              : "Not provided"}
          </strong>

        </div>

        <div className="check">
          {hasValue(formData?.vehicle) ? "✓" : "—"}
        </div>

      </div>


      {/* DAMAGE */}

      <div className="summary-item">

        <div className="summary-icon">
          🖊
        </div>

        <div>

          <span>
            Damage
          </span>

          <strong>
            {hasValue(formData?.damage)
              ? formData.damage
              : "Not provided"}
          </strong>

        </div>

        <div className="check">
          {hasValue(formData?.damage) ? "✓" : "—"}
        </div>

      </div>


      {/* INJURY */}

      <div className="summary-item">

        <div className="summary-icon">
          👤
        </div>

        <div>

          <span>
            Injured
          </span>

          <strong>

            {formData?.injured === "yes"
              ? `${formData.person || "Person"}${formData.injury ? ` — ${formData.injury}` : ""}`
              : formData?.injured === "no"
              ? "No"
              : "Not provided"}

          </strong>

        </div>

        <div className="check">

          {formData?.injured
            ? "✓"
            : "—"}

        </div>

      </div>


      {/* POLICE */}

      <div className="summary-item">

        <div className="summary-icon">
          📄
        </div>

        <div>

          <span>
            Police Report
          </span>

          <strong>

            {formData?.policeReport === "yes"
              ? "Yes"
              : formData?.policeReport === "no"
              ? "No"
              : "Not provided"}

          </strong>

        </div>

        <div className="check">

          {formData?.policeReport
            ? "✓"
            : "—"}

        </div>

      </div>


      {/* DESCRIPTION */}

      <div className="summary-item">

        <div className="summary-icon">
          📝
        </div>

        <div>

          <span>
            Description
          </span>

          <strong>

            {hasValue(formData?.description)
              ? formData.description
              : "Not provided"}

          </strong>

        </div>

        <div className="check">

          {hasValue(formData?.description)
            ? "✓"
            : "—"}

        </div>

      </div>


      <button
        type="button"
        className="edit-summary"
      >
        Edit Extracted Info
      </button>

    </div>
  );
}

export default AISummary;