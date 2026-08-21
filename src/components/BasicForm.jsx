import { useEffect, useState } from "react";
function BasicForm({ initialData, onContinue }) {
  const [incidentType, setIncidentType] = useState(
    initialData?.incidentType || ""
  );

  const [date, setDate] = useState(
    initialData?.date || ""
  );

  const [time, setTime] = useState(
    initialData?.time || ""
  );

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
    IMPORTANT:
    Jab user Step 1 se Step 2 par aayega,
    initialData ki values yahan update hongi.
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
  }, [initialData]);


  /*CONTINUE */

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

    /*
      Description ab bhi yahan maintain kiya hai
      because tumhare existing form mein ye field hai.
    */

    if (!description.trim()) {
      setError("Please describe what happened.");
      return;
    }


    const formData = {
      ...initialData,

      incidentType,
      date,
      time,
      location,
      injured,
      person,
      injury,
      policeReport,
      description
    };


    setError("");

    /*
      Parent App.jsx ko complete data bhejega.
      Iske baad App.jsx currentStep ko 3 karega.
    */

    onContinue(formData);
  };


  /* SAVE DRAFT */

  const handleSaveDraft = () => {

    const draftData = {
      ...initialData,

      incidentType,
      date,
      time,
      location,
      injured,
      person,
      injury,
      policeReport,
      description
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


      {/* FORM HEADER */}

      <div className="form-heading">

        <div className="form-icon">
          🚗
        </div>

        <div>

          <h2>
            Incident Details
          </h2>

          <p>
            Tell us more about what happened.
          </p>

        </div>

      </div>


      {/*FIRST ROW*/}

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
            placeholder="Enter incident location"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              setError("");
            }}
          />

        </div>

      </div>


      {/* INJURY QUESTION */}

      <div className="question">

        <label>
          Was anyone injured?
        </label>

        <div className="choice-container">


          {/* YES */}

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


          {/* NO */}

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


      {/* INJURY DETAILS*/}

      {injured === "yes" && (

        <div className="form-grid">


          {/* PERSON */}

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


          {/* INJURY */}

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


      {/* POLICE REPORT*/}

      <div className="question">

        <label>
          Police Report Filed?
        </label>

        <div className="choice-container">


          {/* YES */}

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


          {/* NO */}

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
          Describe what happened
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
          placeholder="Tell us what happened..."
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


      {/*SAVE MESSAGE */}

      {saved && (

        <div className="save-message">
          Draft saved successfully!
        </div>

      )}


      {/* BUTTONS*/}

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