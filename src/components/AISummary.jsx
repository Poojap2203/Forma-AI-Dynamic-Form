function AISummary({ formData }) {

const data = formData || {};


  /* ===============================
     ALL IMPORTANT FIELDS
     =============================== */

  const fields = [

    data.incidentType,
    data.date,
    data.time,
    data.location,
    data.injured,
    data.policeReport,
    data.description,

    data.vehicleMake,
    data.vehicleModel,
    data.registration,
    data.damageType,
    data.severity,
    data.damageDescription

  ];


  /* ===============================
     CALCULATE PERCENTAGE
     =============================== */

  const filledFields = fields.filter(
    (field) =>
      field !== undefined &&
      field !== null &&
      field.toString().trim() !== ""
  ).length;


  const percentage = Math.round(
    (filledFields / fields.length) * 100
  );


  /* ===============================
     VALUES
     =============================== */

  const incidentType =
    data.incidentType || "Not provided";


  const dateTime =
    data.date
      ? `${data.date}${data.time ? `, ${data.time}` : ""}`
      : "Not provided";


  const location =
    data.location || "Not provided";


  const vehicle =
    data.vehicleMake || data.vehicleModel
      ? `${data.vehicleMake || ""} ${
          data.vehicleModel || ""
        }`.trim()
      : "Not provided";


  const damage =
    data.damageType || "Not provided";


  const severity =
    data.severity || "Not provided";


  let injured = "Not provided";

  if (data.injured === "yes") {

    injured =
      data.person
        ? `${data.person}${
            data.injury
              ? `, ${data.injury}`
              : ""
          }`
        : "Yes";

  }

  if (data.injured === "no") {
    injured = "No";
  }


  const policeReport =
    data.policeReport === "yes"
      ? "Yes"
      : data.policeReport === "no"
      ? "No"
      : "Not provided";


  return (

    <div className="ai-summary">


      {/* HEADER */}

      <div className="summary-header">

        <div>

          <h3>
            ✨ AI Extracted Summary
          </h3>

          <p>
            We've extracted these details from your description. Please review.
          </p>

        </div>


        <div className="summary-score">
          {percentage}%
        </div>

      </div>


      {/* ROBOT */}

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
            {incidentType}
          </strong>

        </div>

        <div className="check">
          {data.incidentType ? "✓" : "○"}
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
            {dateTime}
          </strong>

        </div>

        <div className="check">
          {data.date ? "✓" : "○"}
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
            {location}
          </strong>

        </div>

        <div className="check">
          {data.location ? "✓" : "○"}
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
            {vehicle}
          </strong>

        </div>

        <div className="check">
          {data.vehicleMake && data.vehicleModel
            ? "✓"
            : "○"}
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
            {damage}
          </strong>

        </div>

        <div className="check">
          {data.damageType ? "✓" : "○"}
        </div>

      </div>


      {/* SEVERITY */}

      <div className="summary-item">

        <div className="summary-icon">
          ⚠️
        </div>

        <div>

          <span>
            Damage Severity
          </span>

          <strong>
            {severity}
          </strong>

        </div>

        <div className="check">
          {data.severity ? "✓" : "○"}
        </div>

      </div>


      {/* INJURED */}

      <div className="summary-item">

        <div className="summary-icon">
          👤
        </div>

        <div>

          <span>
            Injured
          </span>

          <strong>
            {injured}
          </strong>

        </div>

        <div className="check">
          {data.injured ? "✓" : "○"}
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
            {policeReport}
          </strong>

        </div>

        <div className="check">
          {data.policeReport ? "✓" : "○"}
        </div>

      </div>


      {/* EDIT */}

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