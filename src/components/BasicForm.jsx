import { useState } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";
import InjuryDetails from "./InjuryDetails";
import PoliceReport from "./PoliceReport";


function BasicForm({ onContinue }) {

  const [injured, setInjured] = useState("");
  const [person, setPerson] = useState("");
  const [injury, setInjury] = useState("");

  const [policeReport, setPoliceReport] = useState("");

  const [description, setDescription] = useState("");

  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);


  /*CONTINUE */

  const handleContinue = () => {

    if (injured === "") {
      setError("Please select whether anyone was injured.");
      return;
    }

    if (injured === "yes" && person === "") {
      setError("Please select who was injured.");
      return;
    }

    if (injured === "yes" && injury.trim() === "") {
      setError("Please describe the injury.");
      return;
    }

    if (policeReport === "") {
      setError("Please select whether a police report was filed.");
      return;
    }

    if (description.trim() === "") {
      setError("Please describe what happened.");
      return;
    }

    setError("");

    onContinue();
  };


  /* SAVE DRAFT*/

  const handleSaveDraft = () => {

    const draftData = {
      injured,
      person,
      injury,
      policeReport,
      description
    };

    localStorage.setItem(
      "formaAI_draft",
      JSON.stringify(draftData)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };


  return (
    <div className="form-card">


      {/* FORM HEADING */}

      <div className="form-heading">

        <div className="form-icon">
          🚗
        </div>

        <div>

          <h2>Incident Details</h2>

          <p>
            Tell us more about what happened.
          </p>

        </div>

      </div>



      {/* BASIC INFORMATION*/}

      <div className="form-grid">

        <SelectField
          label="Incident Type"
          options={[
            "Road Accident",
            "Vehicle Theft",
            "Natural Disaster",
            "Fire",
            "Other"
          ]}
        />


        <InputField
          label="Date of Incident"
          type="date"
        />


        <InputField
          label="Time of Incident"
          type="time"
        />


        <InputField
          label="Location"
          placeholder="Enter incident location"
        />

      </div>



      {/*INJURY QUESTION */}

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
            Yes
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
            No
          </button>


        </div>

      </div>



      {/* INJURY DETAILS*/}

      <InjuryDetails
        injured={injured}
        person={person}
        setPerson={setPerson}
        injury={injury}
        setInjury={setInjury}
      />



      {/* POLICE REPORT */}

      <PoliceReport
        policeReport={policeReport}
        setPoliceReport={setPoliceReport}
      />



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
            }

          }}
          maxLength="500"
          placeholder="Tell us what happened..."
        />


        <div className="character-count">
          {description.length} / 500
        </div>

      </div>



      {/* ERROR MESSAGE*/}

      {error && (
        <div className="form-error">
          {error}
        </div>
      )}



      {/*SAVE MESSAGE*/}

      {saved && (
        <div className="save-message">
          Draft saved successfully!
        </div>
      )}



      {/*BUTTONS */}

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