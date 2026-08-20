import { useState } from "react";
function VehicleDamage({
  initialData,
  onBack,
  onContinue
}) {

  const [vehicleMake, setVehicleMake] = useState(
    initialData?.vehicleMake || ""
  );

  const [vehicleModel, setVehicleModel] = useState(
    initialData?.vehicleModel || ""
  );

  const [registration, setRegistration] = useState(
    initialData?.registration || ""
  );

  const [damageType, setDamageType] = useState(
    initialData?.damageType || ""
  );

  const [severity, setSeverity] = useState(
    initialData?.severity || ""
  );

  const [damageDescription, setDamageDescription] =
    useState(
      initialData?.damageDescription || ""
    );

  const [error, setError] = useState("");


  const handleContinue = () => {

    if (vehicleMake.trim() === "") {
      setError("Please enter the vehicle make.");
      return;
    }

    if (vehicleModel.trim() === "") {
      setError("Please enter the vehicle model.");
      return;
    }

    if (registration.trim() === "") {
      setError("Please enter the vehicle registration number.");
      return;
    }

    if (damageType === "") {
      setError("Please select the damage type.");
      return;
    }

    if (severity === "") {
      setError("Please select the damage severity.");
      return;
    }

    if (damageDescription.trim() === "") {
      setError("Please describe the damage.");
      return;
    }


    const formData = {
      vehicleMake,
      vehicleModel,
      registration,
      damageType,
      severity,
      damageDescription
    };


    setError("");

    onContinue(formData);

  };


  return (

    <div className="form-card">


      {/* HEADER */}

      <div className="form-heading">

        <div className="form-icon">
          🚗
        </div>

        <div>

          <h2>Vehicle & Damage</h2>

          <p>
            Tell us about your vehicle and the damage.
          </p>

        </div>

      </div>



      {/* VEHICLE */}

      <h3 className="section-title">
        Vehicle Details
      </h3>


      <div className="form-grid">


        <div className="form-group">

          <label>
            Vehicle Make
          </label>

          <input

            type="text"

            value={vehicleMake}

            onChange={(e) =>
              setVehicleMake(e.target.value)
            }

            placeholder="e.g. Honda"

          />

        </div>


        <div className="form-group">

          <label>
            Vehicle Model
          </label>

          <input

            type="text"

            value={vehicleModel}

            onChange={(e) =>
              setVehicleModel(e.target.value)
            }

            placeholder="e.g. City"

          />

        </div>


        <div className="form-group">

          <label>
            Registration Number
          </label>

          <input

            type="text"

            value={registration}

            onChange={(e) =>
              setRegistration(e.target.value)
            }

            placeholder="e.g. MP09AB1234"

          />

        </div>

      </div>



      {/* DAMAGE */}

      <h3 className="section-title damage-title">
        Damage Details
      </h3>


      <div className="form-grid">


        <div className="form-group">

          <label>
            Damage Type
          </label>

          <select

            value={damageType}

            onChange={(e) =>
              setDamageType(e.target.value)
            }

          >

            <option value="">
              Select Damage Type
            </option>

            <option value="Front Bumper">
              Front Bumper
            </option>

            <option value="Rear Bumper">
              Rear Bumper
            </option>

            <option value="Windshield">
              Windshield
            </option>

            <option value="Side Door">
              Side Door
            </option>

            <option value="Multiple Areas">
              Multiple Areas
            </option>

            <option value="Other">
              Other
            </option>

          </select>

        </div>


        <div className="form-group">

          <label>
            Damage Severity
          </label>

          <select

            value={severity}

            onChange={(e) =>
              setSeverity(e.target.value)
            }

          >

            <option value="">
              Select Severity
            </option>

            <option value="Minor">
              Minor
            </option>

            <option value="Moderate">
              Moderate
            </option>

            <option value="Major">
              Major
            </option>

            <option value="Severe">
              Severe
            </option>

          </select>

        </div>

      </div>



      {/* DAMAGE DESCRIPTION */}

      <div className="description">

        <label>
          Describe the Damage
        </label>


        <textarea

          value={damageDescription}

          onChange={(e) => {

            if (e.target.value.length <= 500) {

              setDamageDescription(
                e.target.value
              );

            }

          }}

          maxLength="500"

          placeholder="Describe the damage to your vehicle..."

        />


        <div className="character-count">

          {damageDescription.length} / 500

        </div>

      </div>



      {/* ERROR */}

      {error && (

        <div className="form-error">
          {error}
        </div>

      )}



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

          onClick={handleContinue}

        >
          Continue →
        </button>


      </div>


    </div>
  );
}


export default VehicleDamage;