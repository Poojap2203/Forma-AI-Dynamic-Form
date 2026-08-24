 import { useEffect, useState } from "react";

function BasicForm({ initialData, onContinue, templateType = "default" }) {
  const getTemplateTitle = () => {
    if (templateType === "vehicleAccident") {
      return "Vehicle Accident";
    }

    if (templateType === "vehicleDamage") {
      return "Vehicle Damage";
    }

    if (templateType === "insuranceClaim") {
      return "Insurance Claim";
    }

    return "Incident Details";
  };

  const getTemplateIcon = () => {
    if (templateType === "vehicleAccident") {
      return "🚗";
    }

    if (templateType === "vehicleDamage") {
      return "💥";
    }

    if (templateType === "insuranceClaim") {
      return "🛡️";
    }

    return "🚗";
  };

  const getTemplateDescription = () => {
    if (templateType === "vehicleAccident") {
      return "Report details about your vehicle accident.";
    }

    if (templateType === "vehicleDamage") {
      return "Tell us about the damage to your vehicle.";
    }

    if (templateType === "insuranceClaim") {
      return "Complete the details to start your insurance claim.";
    }

    return "Tell us more about what happened.";
  };

  const [incidentType, setIncidentType] = useState(
    initialData?.incidentType || ""
  );

  const [date, setDate] = useState(initialData?.date || "");
  const [time, setTime] = useState(initialData?.time || "");
  const [location, setLocation] = useState(
    initialData?.location || ""
  );

  const [injured, setInjured] = useState(
    initialData?.injured || ""
  );

  const [person, setPerson] = useState(
    initialData?.person || ""
  );

  const [injury, setInjury] = useState(
    initialData?.injury || ""
  );

  const [policeReport, setPoliceReport] = useState(
    initialData?.policeReport || ""
  );

  const [description, setDescription] = useState(
    initialData?.description || ""
  );

  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  /*
    When a template is selected, update the local form values.
  */
  useEffect(() => {
    setIncidentType(initialData?.incidentType || "");
    setDate(initialData?.date || "");
    setTime(initialData?.time || "");
    setLocation(initialData?.location || "");
    setInjured(initialData?.injured || "");
    setPerson(initialData?.person || "");
    setInjury(initialData?.injury || "");
    setPoliceReport(initialData?.policeReport || "");
    setDescription(initialData?.description || "");
    setError("");
  }, [initialData, templateType]);

  const handleContinue = () => {
    if (!incidentType) {
      setError("Please select an incident type.");
      return;
    }

    if (!date) {
      setError("Please select the incident date.");
      return;
    }

    if (!location.trim()) {
      setError("Please enter the incident location.");
      return;
    }

    if (!injured) {
      setError("Please select whether anyone was injured.");
      return;
    }

    if (injured === "yes" && !person) {
      setError("Please select who was injured.");
      return;
    }

    if (injured === "yes" && !injury.trim()) {
      setError("Please describe the injury.");
      return;
    }

    if (!policeReport) {
      setError("Please select whether a police report was filed.");
      return;
    }

    if (!description.trim()) {
      setError("Please describe what happened.");
      return;
    }

    const formData = {
      incidentType,
      date,
      time,
      location,
      injured,
      person,
      injury,
      policeReport,
      description,
      templateType
    };

    setError("");
    onContinue(formData);
  };

  const handleSaveDraft = () => {
    const draftData = {
      incidentType,
      date,
      time,
      location,
      injured,
      person,
      injury,
      policeReport,
      description,
      templateType
    };

    localStorage.setItem(
      "formaAI_incident_draft",
      JSON.stringify(draftData)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  return (
    <div className="form-card">

      {/* TEMPLATE HEADER */}

      <div className="form-heading">

        <div className="form-icon">
          {getTemplateIcon()}
        </div>

        <div>
          <h2>
            {getTemplateTitle()}
          </h2>

          <p>
            {getTemplateDescription()}
          </p>
        </div>

      </div>


      {/* TEMPLATE INFORMATION */}

      {templateType !== "default" && (
        <div
          style={{
            padding: "12px 16px",
            marginBottom: "20px",
            borderRadius: "10px",
            background: "#f5f7ff",
            border: "1px solid #e2e5ff",
            color: "#4b4f72",
            fontSize: "14px"
          }}
        >
          <strong>
            Template selected:
          </strong>{" "}
          {getTemplateTitle()}
        </div>
      )}


      {/* FORM GRID */}

      <div className="form-grid">

        {/* INCIDENT TYPE */}

        <div className="form-group">

          <label>
            Incident Type
          </label>

          <select
            value={incidentType}
            onChange={(e) => {
              setIncidentType(e.target.value);
              setError("");
            }}
          >

            <option value="">
              Select Incident Type
            </option>

            {templateType === "vehicleAccident" && (
              <>
                <option value="Vehicle Accident">
                  Vehicle Accident
                </option>

                <option value="Road Accident">
                  Road Accident
                </option>

                <option value="Collision">
                  Collision
                </option>
              </>
            )}

            {templateType === "vehicleDamage" && (
              <>
                <option value="Vehicle Damage">
                  Vehicle Damage
                </option>

                <option value="Collision Damage">
                  Collision Damage
                </option>

                <option value="Other Vehicle Damage">
                  Other Vehicle Damage
                </option>
              </>
            )}

            {templateType === "insuranceClaim" && (
              <>
                <option value="Insurance Claim">
                  Insurance Claim
                </option>

                <option value="Road Accident">
                  Road Accident
                </option>

                <option value="Vehicle Damage">
                  Vehicle Damage
                </option>

                <option value="Vehicle Theft">
                  Vehicle Theft
                </option>

                <option value="Natural Disaster">
                  Natural Disaster
                </option>

                <option value="Fire">
                  Fire
                </option>

                <option value="Other">
                  Other
                </option>
              </>
            )}

            {templateType === "default" && (
              <>
                <option value="Road Accident">
                  Road Accident
                </option>

                <option value="Vehicle Theft">
                  Vehicle Theft
                </option>

                <option value="Natural Disaster">
                  Natural Disaster
                </option>

                <option value="Fire">
                  Fire
                </option>

                <option value="Other">
                  Other
                </option>
              </>
            )}

          </select>

        </div>


        {/* DATE */}

        <div className="form-group">

          <label>
            Date of Incident
          </label>

          <input
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setError("");
            }}
          />

        </div>


        {/* TIME */}

        <div className="form-group">

          <label>
            Time of Incident
          </label>

          <input
            type="time"
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
              setError("");
            }}
          />

        </div>


        {/* LOCATION */}

        <div className="form-group">

          <label>
            Location
          </label>

          <input
            type="text"
            placeholder={
              templateType === "vehicleDamage"
                ? "Enter location where damage occurred"
                : "Enter incident location"
            }
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              setError("");
            }}
          />

        </div>

      </div>


      {/* VEHICLE DAMAGE SPECIFIC INFORMATION */}

      {templateType === "vehicleDamage" && (
        <div className="question">

          <label>
            What type of damage occurred?
          </label>

          <div className="choice-container">

            <button
              type="button"
              className={
                description.includes("Minor")
                  ? "choice active"
                  : "choice"
              }
              onClick={() => {
                setDescription(
                  `Minor vehicle damage. `
                );
                setError("");
              }}
            >
              Minor Damage
            </button>

            <button
              type="button"
              className={
                description.includes("Major")
                  ? "choice active"
                  : "choice"
              }
              onClick={() => {
                setDescription(
                  `Major vehicle damage. `
                );
                setError("");
              }}
            >
              Major Damage
            </button>

          </div>

        </div>
      )}


      {/* INJURY */}

      <div className="question">

        <label>
          Was anyone injured?
        </label>

        <div className="choice-container">

          <button
            type="button"
            className={
              injured === "yes"
                ? "choice active"
                : "choice"
            }
            onClick={() => {
              setInjured("yes");
              setError("");
            }}
          >
            😟 Yes
          </button>

          <button
            type="button"
            className={
              injured === "no"
                ? "choice active"
                : "choice"
            }
            onClick={() => {
              setInjured("no");
              setPerson("");
              setInjury("");
              setError("");
            }}
          >
            🙂 No
          </button>

        </div>

      </div>


      {/* INJURY DETAILS */}

      {injured === "yes" && (
        <div className="form-grid">

          <div className="form-group">

            <label>
              Who was injured?
            </label>

            <select
              value={person}
              onChange={(e) => {
                setPerson(e.target.value);
                setError("");
              }}
            >

              <option value="">
                Select Person
              </option>

              <option value="Driver">
                Driver
              </option>

              <option value="Passenger">
                Passenger
              </option>

              <option value="Pedestrian">
                Pedestrian
              </option>

              <option value="Other">
                Other
              </option>

            </select>

          </div>


          <div className="form-group">

            <label>
              Describe the injury
            </label>

            <input
              type="text"
              placeholder="Describe the injury"
              value={injury}
              onChange={(e) => {
                setInjury(e.target.value);
                setError("");
              }}
            />

          </div>

        </div>
      )}


      {/* POLICE REPORT */}

      <div className="question">

        <label>
          Police Report Filed?
        </label>

        <div className="choice-container">

          <button
            type="button"
            className={
              policeReport === "yes"
                ? "choice active"
                : "choice"
            }
            onClick={() => {
              setPoliceReport("yes");
              setError("");
            }}
          >
            Yes
          </button>

          <button
            type="button"
            className={
              policeReport === "no"
                ? "choice active"
                : "choice"
            }
            onClick={() => {
              setPoliceReport("no");
              setError("");
            }}
          >
            No
          </button>

        </div>

      </div>


      {/* DESCRIPTION */}

      <div className="description">

        <label>
          {templateType === "vehicleAccident"
            ? "Describe the accident"
            : templateType === "vehicleDamage"
            ? "Describe the vehicle damage"
            : templateType === "insuranceClaim"
            ? "Describe your insurance claim"
            : "Describe what happened"}
        </label>

        <textarea
          value={description}
          onChange={(e) => {
            if (e.target.value.length <= 500) {
              setDescription(e.target.value);
              setError("");
            }
          }}
          maxLength="500"
          placeholder={
            templateType === "vehicleAccident"
              ? "Tell us how the accident happened..."
              : templateType === "vehicleDamage"
              ? "Tell us what damage occurred..."
              : templateType === "insuranceClaim"
              ? "Tell us about your insurance claim..."
              : "Tell us what happened..."
          }
        />

        <div className="character-count">
          {description.length} / 500
        </div>

      </div>


      {/* ERROR */}

      {error && (
        <div className="form-error">
          {error}
        </div>
      )}


      {/* SAVE */}

      {saved && (
        <div className="save-message">
          Draft saved successfully!
        </div>
      )}


      {/* BUTTONS */}

      <div className="form-buttons">

        <button
          type="button"
          className="save"
          onClick={handleSaveDraft}
        >
          Save Draft
        </button>

        <button
          type="button"
          className="continue"
          onClick={handleContinue}
        >
          Continue →
        </button>

      </div>

    </div>
  );
}

export default BasicForm;