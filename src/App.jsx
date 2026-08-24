import { useState } from "react";
import "./App.css";

import BasicForm from "./components/BasicForm";
import VehicleDamage from "./components/VehicleDamage";
import AISummary from "./components/AISummary";
import ReviewForm from "./components/ReviewForm";


function App() {

  const [currentStep, setCurrentStep] = useState(2);

  const [formData, setFormData] = useState({
    incidentType: "",
    date: "",
    time: "",
    location: "",
    injured: "",
    person: "",
    injury: "",
    policeReport: "",
    description: "",

    vehicleMake: "",
    vehicleModel: "",
    registration: "",
    damageType: "",
    severity: "",
    damageDescription: ""
  });


  /* =========================
     INCIDENT CONTINUE
  ========================= */

  const handleIncidentContinue = (data) => {

    setFormData((previous) => ({
      ...previous,
      ...data
    }));

    setCurrentStep(3);
  };


  /* =========================
     VEHICLE CONTINUE
  ========================= */

  const handleVehicleContinue = (data) => {

    setFormData((previous) => ({
      ...previous,
      ...data
    }));

    setCurrentStep(4);
  };


  /* =========================
     VEHICLE BACK
  ========================= */

  const handleVehicleBack = () => {
    setCurrentStep(2);
  };


  /* =========================
     REVIEW BACK
  ========================= */

  const handleReviewBack = () => {
    setCurrentStep(3);
  };


  /* =========================
     EDIT INCIDENT
  ========================= */

  const handleEditIncident = () => {
    setCurrentStep(2);
  };


  /* =========================
     EDIT VEHICLE
  ========================= */

  const handleEditVehicle = () => {
    setCurrentStep(3);
  };


  return (

    <div className="app">

      {/* ================= SIDEBAR ================= */}

      <aside className="sidebar">

        <div className="logo-area">

          <div className="logo-icon">
            ✨
          </div>

          <div>
            <h2>Forma AI</h2>
            <span>Smart Claims Assistant</span>
          </div>

        </div>


        <nav className="sidebar-menu">

          <div className="menu-item">
            🏠
            <span>Dashboard</span>
          </div>

          <div className="menu-item active-menu">
            ＋
            <span>New Claim</span>
          </div>

          <div className="menu-item">
            📄
            <span>My Claims</span>
          </div>

          <div className="menu-item">

            📋

            <span>
              Drafts
            </span>

            <span className="notification-badge">
              2
            </span>

          </div>

          <div className="menu-item">
            ▦
            <span>Templates</span>
          </div>

          <div className="menu-item">
            ✨
            <span>AI Assistant</span>
          </div>

          <div className="menu-item">
            📊
            <span>Insights</span>
          </div>

          <div className="menu-item">
            ⚙
            <span>Settings</span>
          </div>

        </nav>


        {/* AI MAGIC INPUT */}

        <div className="magic-box">

          <h4 className="magic-title">
            ✨ AI Magic Input
          </h4>

          <p>
            Describe your incident in your own words
            and let our AI understand and fill the
            form intelligently.
          </p>

          <button>
            Try It Now →
          </button>

        </div>


        {/* USER */}

        <div className="user-profile">

          <div className="user-avatar">
            A
          </div>

          <div className="user-info">

            <strong>
              Anjali Sharma
            </strong>

            <small>
              anjali@example.com
            </small>

          </div>

          <span className="user-arrow">
            ⌄
          </span>

        </div>

      </aside>


      {/* ================= MAIN ================= */}

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
              🔔
            </button>

            <div className="header-user">

              <div className="header-avatar">
                A
              </div>

              <span>
                Anjali
              </span>

              <span>
                ⌄
              </span>

            </div>

          </div>

        </header>


        {/* ================= STEPPER ================= */}

        <div className="stepper">


          {/* STEP 1 */}

          <div className="step completed">

            <div className="step-circle">
              ✓
            </div>

            <strong>
              Describe Incident
            </strong>

            <span>
              Completed
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

              {currentStep > 2
                ? "✓"
                : "2"}

            </div>

            <strong>
              Incident Details
            </strong>

            <span>

              {currentStep > 2
                ? "Completed"
                : "You are here"}

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

              {currentStep > 3
                ? "✓"
                : "3"}

            </div>

            <strong>
              Vehicle & Damage
            </strong>

            <span>

              {currentStep > 3
                ? "Completed"
                : currentStep === 3
                ? "You are here"
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


        {/* ================= CONTENT ================= */}

        <div className="content-layout">


          {/* LEFT FORM */}

          <div className="main-form">


            {/* STEP 2 */}

            {currentStep === 2 && (

              <BasicForm
                initialData={formData}
                onContinue={handleIncidentContinue}
              />

            )}


            {/* STEP 3 */}

            {currentStep === 3 && (

              <VehicleDamage
                initialData={formData}
                onBack={handleVehicleBack}
                onContinue={handleVehicleContinue}
              />

            )}


            {/* STEP 4 */}

            {currentStep === 4 && (

              <ReviewForm

                incidentData={formData}

                vehicleData={formData}

                onBack={handleReviewBack}

                onEditIncident={handleEditIncident}

                onEditVehicle={handleEditVehicle}

              />

            )}

          </div>


          {/* AI SUMMARY */}

          <AISummary
            formData={formData}
          />

        </div>

      </main>

    </div>
  );
}

export default App;