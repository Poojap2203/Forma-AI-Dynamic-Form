import { useState } from "react";
import "./App.css";
import BasicForm from "./components/BasicForm";
import AISummary from "./components/AISummary";

function App() {
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    description: "",
    incidentType: "",
    date: "",
    time: "",
    location: "",
    injured: "",
    person: "",
    injury: "",
    policeReport: "",
    vehicle: "",
    damage: "",
  });

  // STEP 1
  const handleIncidentContinue = () => {
    if (!formData.description.trim()) {
      alert("Please describe what happened.");
      return;
    }

    setCurrentStep(2);
  };

  // STEP 2
  const handleBasicFormContinue = (data) => {
    setFormData((previous) => ({
      ...previous,
      ...data,
    }));

    setCurrentStep(3);
  };

  // STEP 3
  const handleVehicleContinue = () => {
    if (!formData.vehicle.trim()) {
      alert("Please enter the vehicle details.");
      return;
    }

    if (!formData.damage.trim()) {
      alert("Please describe the damage.");
      return;
    }

    setCurrentStep(4);
  };

  // UPDATE FORM DATA
  const updateFormData = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  return (
    <div className="app">

      {/*SIDEBAR  */}

      <aside className="sidebar">

        <div className="logo-area">
          <div className="logo-icon">✦</div>

          <div>
            <h2>Forma AI</h2>
            <span>Smart Claims Assistant</span>
          </div>
        </div>

        <nav className="sidebar-menu">

          <div className="menu-item">
            <span className="menu-icon">⌂</span>
            Dashboard
          </div>

          <div className="menu-item active-menu">
            <span className="menu-icon">＋</span>
            New Claim
          </div>

          <div className="menu-item">
            <span className="menu-icon">▣</span>
            My Claims
          </div>

          <div className="menu-item">
            <span className="menu-icon">□</span>
            Drafts
            <span className="notification-badge">2</span>
          </div>

          <div className="menu-item">
            <span className="menu-icon">▦</span>
            Templates
          </div>

          <div className="menu-item">
            <span className="menu-icon">✦</span>
            AI Assistant
          </div>

          <div className="menu-item">
            <span className="menu-icon">◫</span>
            Insights
          </div>

          <div className="menu-item">
            <span className="menu-icon">⚙</span>
            Settings
          </div>

        </nav>

        <div className="magic-box">

          <div className="magic-title">
            ✦ AI Magic Input
          </div>

          <p>
            Describe your incident in your own words
            and let our AI understand and fill the form
            intelligently.
          </p>

          <button
            type="button"
            onClick={() => setCurrentStep(1)}
          >
            Try It Now →
          </button>

        </div>

        <div className="user-profile">

          <div className="user-avatar">
            A
          </div>

          <div className="user-info">
            <strong>Anjali Sharma</strong>
            <small>anjali@example.com</small>
          </div>

          <span className="user-arrow">⌄</span>

        </div>

      </aside>


      {/*MAIN */}

      <main className="main-content">

        {/* HEADER */}

        <header className="top-header">

          <div className="header-text">

            <h1>
              Create <span>Insurance Claim</span>
            </h1>

            <p>
              We're here to simplify the process for you ✨
            </p>

          </div>

          <div className="header-right">

            <button className="header-icon">
              ?
            </button>

            <button className="header-icon">
              ♧
            </button>

            <div className="header-user">

              <div className="header-avatar">
                A
              </div>

              <span>Anjali</span>
              <span>⌄</span>

            </div>

          </div>

        </header>


        {/*STEPPER  */}

        <div className="stepper">

          {/* STEP 1 */}

          <div
            className={
              currentStep === 1
                ? "step active"
                : currentStep > 1
                ? "step completed"
                : "step"
            }
          >

            <div className="step-circle">

              {currentStep > 1 ? "✓" : "1"}

            </div>

            <strong>
              Describe Incident
            </strong>

            <span>
              {currentStep > 1
                ? "Completed"
                : "You are here"}
            </span>

          </div>


          {/* STEP 2 */}

          <div
            className={
              currentStep === 2
                ? "step active"
                : currentStep > 2
                ? "step completed"
                : "step"
            }
          >

            <div className="step-circle">

              {currentStep > 2 ? "✓" : "2"}

            </div>

            <strong>
              Incident Details
            </strong>

            <span>
              {currentStep === 2
                ? "You are here"
                : currentStep > 2
                ? "Completed"
                : "Next up"}
            </span>

          </div>


          {/* STEP 3 */}

          <div
            className={
              currentStep === 3
                ? "step active"
                : currentStep > 3
                ? "step completed"
                : "step"
            }
          >

            <div className="step-circle">

              {currentStep > 3 ? "✓" : "3"}

            </div>

            <strong>
              Vehicle & Damage
            </strong>

            <span>
              {currentStep === 3
                ? "You are here"
                : currentStep > 3
                ? "Completed"
                : "Next up"}
            </span>

          </div>


          {/* STEP 4 */}

          <div
            className={
              currentStep === 4
                ? "step active"
                : "step"
            }
          >

            <div className="step-circle">
              4
            </div>

            <strong>
              Review & Submit
            </strong>

            <span>
              {currentStep === 4
                ? "You are here"
                : "Final step"}
            </span>

          </div>

        </div>


        {/* CONTENT */}

        <div className="content-layout">


          {/*  LEFT  */}

          <div className="main-form">


            {/* STEP 1 */}

            {currentStep === 1 && (

              <div className="form-card">

                <div className="form-heading">

                  <div className="form-icon">
                    ✨
                  </div>

                  <div>

                    <h2>
                      Describe the Incident
                    </h2>

                    <p>
                      Tell us what happened in your own words.
                    </p>

                  </div>

                </div>


                <div className="description">

                  <label>
                    What happened?
                  </label>

                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      updateFormData(
                        "description",
                        e.target.value
                      )
                    }
                    placeholder="Example: I was driving to work when another car hit my vehicle from behind..."
                  />

                  <div className="character-count">
                    {formData.description.length} / 500
                  </div>

                </div>


                <div className="form-buttons">

                  <button
                    type="button"
                    className="continue"
                    onClick={handleIncidentContinue}
                  >
                    Continue →
                  </button>

                </div>

              </div>

            )}


            {/* STEP 2 */}

            {currentStep === 2 && (

              <BasicForm
                initialData={formData}
                onContinue={handleBasicFormContinue}
              />

            )}


            {/* STEP 3 */}

            {currentStep === 3 && (

              <div className="form-card">

                <div className="form-heading">

                  <div className="form-icon">
                    🚘
                  </div>

                  <div>

                    <h2>
                      Vehicle & Damage
                    </h2>

                    <p>
                      Tell us about your vehicle and the damage.
                    </p>

                  </div>

                </div>


                <div className="form-group">

                  <label>
                    Vehicle
                  </label>

                  <input
                    type="text"
                    value={formData.vehicle}
                    onChange={(e) =>
                      updateFormData(
                        "vehicle",
                        e.target.value
                      )
                    }
                    placeholder="Example: Honda City"
                  />

                </div>


                <div className="description">

                  <label>
                    Describe the Damage
                  </label>

                  <textarea
                    value={formData.damage}
                    onChange={(e) =>
                      updateFormData(
                        "damage",
                        e.target.value
                      )
                    }
                    placeholder="Example: Front bumper damaged and windshield cracked..."
                  />

                </div>


                <div className="form-buttons">

                  <button
                    type="button"
                    className="save"
                    onClick={() => setCurrentStep(2)}
                  >
                    ← Back
                  </button>

                  <button
                    type="button"
                    className="continue"
                    onClick={handleVehicleContinue}
                  >
                    Continue →
                  </button>

                </div>

              </div>

            )}


            {/* STEP 4 */}

            {currentStep === 4 && (

              <div className="form-card">

                <div className="form-heading">

                  <div className="form-icon">
                    ✓
                  </div>

                  <div>

                    <h2>
                      Review & Submit
                    </h2>

                    <p>
                      Please review your claim before submitting.
                    </p>

                  </div>

                </div>


                <div className="review-box">

                  <h3>
                    Incident
                  </h3>

                  <p>
                    {formData.description || "Not provided"}
                  </p>


                  <h3>
                    Incident Type
                  </h3>

                  <p>
                    {formData.incidentType || "Not provided"}
                  </p>


                  <h3>
                    Date & Time
                  </h3>

                  <p>
                    {formData.date || "Not provided"}
                    {formData.time
                      ? ` at ${formData.time}`
                      : ""}
                  </p>


                  <h3>
                    Location
                  </h3>

                  <p>
                    {formData.location || "Not provided"}
                  </p>


                  <h3>
                    Vehicle
                  </h3>

                  <p>
                    {formData.vehicle || "Not provided"}
                  </p>


                  <h3>
                    Damage
                  </h3>

                  <p>
                    {formData.damage || "Not provided"}
                  </p>

                </div>


                <div className="form-buttons">

                  <button
                    type="button"
                    className="save"
                    onClick={() => setCurrentStep(3)}
                  >
                    ← Back
                  </button>

                  <button
                    type="button"
                    className="continue"
                    onClick={() =>
                      alert("Claim submitted successfully!")
                    }
                  >
                    Submit Claim ✓
                  </button>

                </div>

              </div>

            )}

          </div>


          {/* ================= AI SUMMARY ================= */}

          <AISummary
            formData={formData}
          />

        </div>

      </main>

    </div>
  );
}

export default App;