  import { useEffect, useState } from "react";

function VehicleDamage({ initialData, onBack, onContinue }) {
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

  const [damageDescription, setDamageDescription] = useState(
    initialData?.damageDescription || ""
  );

  const [error, setError] = useState("");
  const [listening, setListening] = useState(false);

  const vehicleModels = {
    "Maruti Suzuki": [
      "Swift",
      "Baleno",
      "WagonR",
      "Alto K10",
      "Dzire",
      "Brezza",
      "Ertiga",
      "Fronx",
      "Grand Vitara",
      "Celerio",
      "Ignis",
      "S-Presso",
      "Jimny",
      "XL6",
      "Invicto",
    ],

    Hyundai: [
      "i10",
      "Grand i10 Nios",
      "i20",
      "Aura",
      "Verna",
      "Venue",
      "Creta",
      "Alcazar",
      "Exter",
      "Tucson",
      "Kona",
      "Ioniq 5",
    ],

    Honda: [
      "City",
      "Amaze",
      "Jazz",
      "Civic",
      "Accord",
      "WR-V",
      "BR-V",
      "CR-V",
      "Elevate",
      "City Hybrid",
      "Brio",
      "Mobilio",
    ],

    Tata: [
      "Tiago",
      "Tigor",
      "Altroz",
      "Punch",
      "Nexon",
      "Harrier",
      "Safari",
      "Curvv",
      "Tiago EV",
      "Nexon EV",
      "Punch EV",
    ],

    Mahindra: [
      "Bolero",
      "Scorpio",
      "Scorpio N",
      "Thar",
      "XUV300",
      "XUV400",
      "XUV700",
      "Marazzo",
      "Bolero Neo",
      "BE 6",
      "XEV 9e",
    ],

    Toyota: [
      "Innova Crysta",
      "Innova Hycross",
      "Fortuner",
      "Glanza",
      "Urban Cruiser Hyryder",
      "Rumion",
      "Camry",
      "Vellfire",
      "Hilux",
      "Land Cruiser",
    ],

    Kia: [
      "Sonet",
      "Seltos",
      "Carens",
      "EV6",
      "EV9",
      "Carnival",
    ],

    MG: [
      "Hector",
      "Hector Plus",
      "Astor",
      "Gloster",
      "ZS EV",
      "Comet EV",
      "Windsor EV",
    ],

    Renault: [
      "Kwid",
      "Triber",
      "Kiger",
      "Duster",
    ],

    Volkswagen: [
      "Polo",
      "Vento",
      "Taigun",
      "Virtus",
      "Tiguan",
    ],

    Skoda: [
      "Slavia",
      "Kushaq",
      "Kodiaq",
      "Superb",
      "Octavia",
    ],

    Nissan: [
      "Magnite",
      "Kicks",
      "X-Trail",
    ],

    Ford: [
      "EcoSport",
      "Endeavour",
      "Figo",
      "Aspire",
      "Freestyle",
    ],

    Chevrolet: [
      "Beat",
      "Spark",
      "Cruze",
      "Sail",
      "Enjoy",
      "Tavera",
    ],

    Jeep: [
      "Compass",
      "Meridian",
      "Wrangler",
      "Grand Cherokee",
    ],

    BMW: [
      "2 Series",
      "3 Series",
      "5 Series",
      "7 Series",
      "X1",
      "X3",
      "X5",
      "X7",
      "i4",
      "iX",
    ],

    "Mercedes-Benz": [
      "A-Class",
      "C-Class",
      "E-Class",
      "S-Class",
      "GLA",
      "GLB",
      "GLC",
      "GLE",
      "GLS",
      "EQB",
      "EQS",
    ],

    Audi: [
      "A3",
      "A4",
      "A6",
      "A8",
      "Q3",
      "Q5",
      "Q7",
      "Q8",
      "e-tron",
    ],

    Volvo: [
      "S60",
      "S90",
      "XC40",
      "XC60",
      "XC90",
      "EX30",
      "EX40",
      "EC40",
    ],

    Tesla: [
      "Model 3",
      "Model Y",
      "Model S",
      "Model X",
    ],

    "Land Rover": [
      "Defender",
      "Discovery",
      "Discovery Sport",
      "Range Rover",
      "Range Rover Sport",
      "Range Rover Velar",
      "Range Rover Evoque",
    ],

    Other: [
      "Other Model",
    ],
  };

  const vehicleMakes = Object.keys(vehicleModels);

  useEffect(() => {
    if (!initialData) return;

    setVehicleMake(initialData.vehicleMake || "");
    setVehicleModel(initialData.vehicleModel || "");
    setRegistration(initialData.registration || "");
    setDamageType(initialData.damageType || "");
    setSeverity(initialData.severity || "");
    setDamageDescription(initialData.damageDescription || "");
  }, [
    initialData?.vehicleMake,
    initialData?.vehicleModel,
    initialData?.registration,
    initialData?.damageType,
    initialData?.severity,
    initialData?.damageDescription,
  ]);

  // VOICE INPUT
  const handleVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice input is not supported in this browser.");
      return;
    }

    if (listening) return;

    const recognition = new window.webkitSpeechRecognition();

    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    setListening(true);

    recognition.start();

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;

      setDamageDescription((previous) =>
        previous.trim()
          ? previous + " " + text
          : text
      );

      setError("");
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  const handleVehicleMakeChange = (value) => {
    setVehicleMake(value);
    setVehicleModel("");
    setError("");
  };

  const handleContinue = () => {
    if (!vehicleMake.trim()) {
      setError("Please select the vehicle make.");
      return;
    }

    if (!vehicleModel.trim()) {
      setError("Please select the vehicle model.");
      return;
    }

    if (!registration.trim()) {
      setError("Please enter the vehicle registration number.");
      return;
    }

    if (!damageType) {
      setError("Please select the damage type.");
      return;
    }

    if (!severity) {
      setError("Please select the damage severity.");
      return;
    }

    if (!damageDescription.trim()) {
      setError("Please describe the damage.");
      return;
    }

    const data = {
      vehicleMake,
      vehicleModel,
      registration,
      damageType,
      severity,
      damageDescription,
    };

    setError("");
    onContinue(data);
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

      {/* VEHICLE DETAILS */}
      <h3 className="section-title">
        Vehicle Details
      </h3>

      <div className="form-grid">

        {/* VEHICLE MAKE */}
        <div className="form-group">
          <label>Vehicle Make</label>

          <select
            value={vehicleMake}
            onChange={(e) =>
              handleVehicleMakeChange(e.target.value)
            }
          >
            <option value="">
              Select Vehicle Make
            </option>

            {vehicleMakes.map((make) => (
              <option key={make} value={make}>
                {make}
              </option>
            ))}
          </select>
        </div>

        {/* VEHICLE MODEL */}
        <div className="form-group">
          <label>Vehicle Model</label>

          <select
            value={vehicleModel}
            disabled={!vehicleMake}
            onChange={(e) => {
              setVehicleModel(e.target.value);
              setError("");
            }}
          >
            <option value="">
              {vehicleMake
                ? "Select Vehicle Model"
                : "Select Vehicle Make First"}
            </option>

            {vehicleMake &&
              vehicleModels[vehicleMake]?.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
          </select>
        </div>

        {/* REGISTRATION */}
        <div className="form-group">
          <label>Registration Number</label>

          <input
            type="text"
            value={registration}
            onChange={(e) => {
              setRegistration(e.target.value);
              setError("");
            }}
            placeholder="e.g. MP09AB1234"
          />
        </div>
      </div>

      {/* DAMAGE DETAILS */}
      <h3 className="section-title damage-title">
        Damage Details
      </h3>

      <div className="form-grid">

        {/* DAMAGE TYPE */}
        <div className="form-group">
          <label>Damage Type</label>

          <select
            value={damageType}
            onChange={(e) => {
              setDamageType(e.target.value);
              setError("");
            }}
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

        {/* DAMAGE SEVERITY */}
        <div className="form-group">
          <label>Damage Severity</label>

          <select
            value={severity}
            onChange={(e) => {
              setSeverity(e.target.value);
              setError("");
            }}
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

        <div className="description-box">

          <textarea
            value={damageDescription}
            maxLength="500"
            placeholder="Describe the damage to your vehicle..."
            onChange={(e) => {
              setDamageDescription(e.target.value);
              setError("");
            }}
          />

          {/* MIC */}
          <button
            type="button"
            className={`mic-button ${
              listening ? "listening" : ""
            }`}
            onClick={handleVoiceInput}
            title={
              listening
                ? "Listening..."
                : "Describe using your voice"
            }
          >
            {listening ? "🔴" : "🎙️"}
          </button>

        </div>

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