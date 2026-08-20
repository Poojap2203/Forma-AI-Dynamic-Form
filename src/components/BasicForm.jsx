import { useState } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";
import TextareaField from "./TextareaField";


function BasicForm() {

  const [injured, setInjured] = useState("");
  const [error, setError] = useState("");


  const handleContinue = () => {

    if (injured === "") {
      setError("Please select whether anyone was injured.");
      return;
    }

    setError("");

    alert("Form details are ready!");
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



      {/* FORM FIELDS */}

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



      {/* INJURY QUESTION */}

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
              setError("");
            }}
          >
            No
          </button>


        </div>

      </div>



      {/* DESCRIPTION */}

      <TextareaField
        label="Describe what happened"
        placeholder="Tell us what happened..."
      />



      {/* ERROR MESSAGE */}

      {error && (
        <div className="form-error">
          {error}
        </div>
      )}



      {/* BUTTONS */}

      <div className="form-buttons">


        <button
          type="button"
          className="save"
          onClick={() => {
            alert("Draft saved!");
          }}
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