 import { useEffect, useState } from "react";

import "./App.css";

import BasicForm from "./components/BasicForm";

import VehicleDamage from "./components/VehicleDamage";

import AISummary from "./components/AISummary";

import ReviewForm from "./components/ReviewForm";

import MyClaims from "./components/MyClaims";

import ClaimTracking from "./components/ClaimTracking";

import Notifications from "./components/Notifications";

import Templates from "./components/Templates";

import AIAssistant from "./components/AIAssistant";


function App() {

  const [currentStep, setCurrentStep] =
    useState(2);


  /* =========================
     - NOTIFICATIONS
     ========================= */

  const [showNotifications, setShowNotifications] =
    useState(false);

  const [notificationCount, setNotificationCount] =
    useState(0);


  const updateNotificationCount = () => {

    try {

      const notifications =
        JSON.parse(
          localStorage.getItem(
            "formaAI_notifications"
          ) || "[]"
        );


      const unread =
        notifications.filter(
          (item) => !item.read
        ).length;


      setNotificationCount(unread);

    } catch {

      setNotificationCount(0);

    }

  };


  useEffect(() => {

    updateNotificationCount();

  }, []);


  const [activePage, setActivePage] =
    useState("newClaim");


  const [trackingClaim, setTrackingClaim] =
    useState(null);


  const [draftLoaded, setDraftLoaded] =
    useState(false);


  const [formData, setFormData] =
    useState({

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
     INCIDENT
     ========================= */

  const handleIncidentContinue =
    (data) => {

      setFormData(
        (previous) => ({
          ...previous,
          ...data
        })
      );

      setCurrentStep(3);

    };


  /* =========================
     VEHICLE
     ========================= */

  const handleVehicleContinue =
    (data) => {

      setFormData(
        (previous) => ({
          ...previous,
          ...data
        })
      );

      setCurrentStep(4);

    };


  const handleVehicleBack = () => {

    setCurrentStep(2);

  };


  const handleReviewBack = () => {

    setCurrentStep(3);

  };


  const handleEditIncident = () => {

    setActivePage("newClaim");

    setCurrentStep(2);

  };


  const handleEditVehicle = () => {

    setActivePage("newClaim");

    setCurrentStep(3);

  };


  /* =========================
     SAVE COMPLETE DRAFT
     ========================= */

  const handleSaveCompleteDraft = () => {

    localStorage.setItem(
      "formaAI_complete_draft",
      JSON.stringify(formData)
    );


    alert(
      "Complete claim draft saved successfully!"
    );

  };


  /* =========================
     LOAD DRAFT
     ========================= */

  const handleLoadDraft = () => {

    try {

      const completeDraft =
        JSON.parse(
          localStorage.getItem(
            "formaAI_complete_draft"
          ) || "null"
        );


      const incidentDraft =
        JSON.parse(
          localStorage.getItem(
            "formaAI_incident_draft"
          ) || "null"
        );


      const vehicleDraft =
        JSON.parse(
          localStorage.getItem(
            "formaAI_vehicle_draft"
          ) || "null"
        );


      if (
        !completeDraft &&
        !incidentDraft &&
        !vehicleDraft
      ) {

        alert(
          "No saved draft found."
        );

        return;

      }


      setFormData(
        (previous) => ({

          ...previous,

          ...(completeDraft || {}),

          ...(incidentDraft || {}),

          ...(vehicleDraft || {})

        })
      );


      setDraftLoaded(true);

      setActivePage("newClaim");

      setCurrentStep(2);

    } catch (error) {

      console.error(
        error
      );

      alert(
        "Unable to load the saved draft."
      );

    }

  };


  /* =========================
     NEW CLAIM
     ========================= */

  const handleNewClaim = () => {

    setActivePage("newClaim");

    setTrackingClaim(null);

    setDraftLoaded(false);


    setFormData({

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


    setCurrentStep(2);


    localStorage.removeItem(
      "formaAI_incident_draft"
    );


    localStorage.removeItem(
      "formaAI_vehicle_draft"
    );


    localStorage.removeItem(
      "formaAI_complete_draft"
    );

  };


  /* =========================
     TRACK CLAIM
     ========================= */

  const handleTrackClaim =
    (claim) => {

      setTrackingClaim(claim);

      setActivePage(
        "claimTracking"
      );

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

            <h2>

              Forma AI

            </h2>


            <span>

              Smart Claims Assistant

            </span>

          </div>

        </div>


        <nav className="sidebar-menu">


          {/* DASHBOARD */}

          <div

            className="menu-item"

            onClick={() => {

              setActivePage(
                "newClaim"
              );

              setCurrentStep(2);

            }}

          >

            🏠

            <span>

              Dashboard

            </span>

          </div>


          {/* NEW CLAIM */}

          <div

            className={

              activePage === "newClaim"

                ? "menu-item active-menu"

                : "menu-item"

            }

            onClick={() => {

              setActivePage(
                "newClaim"
              );

              setCurrentStep(2);

            }}

          >

            ＋

            <span>

              New Claim

            </span>

          </div>


          {/* MY CLAIMS */}

          <div

            className={

              activePage === "myClaims"

                ? "menu-item active-menu"

                : "menu-item"

            }

            onClick={() => {

              setActivePage(
                "myClaims"
              );

            }}

          >

            📄

            <span>

              My Claims

            </span>

          </div>


          {/* DRAFTS */}

          <div

            className="menu-item"

            onClick={
              handleLoadDraft
            }

          >

            📋

            <span>

              Drafts

            </span>


            <span className="notification-badge">

              2

            </span>

          </div>


          {/* =========================
              TEMPLATES
              ========================= */}

          <div

            className={

              activePage === "templates"

                ? "menu-item active-menu"

                : "menu-item"

            }

            onClick={() => {

              setActivePage(
                "templates"
              );

            }}

          >

            ▦

            <span>

              Templates

            </span>

          </div>


          {/* =========================
              AI ASSISTANT
              ========================= */}

          <div

            className={

              activePage === "aiAssistant"

                ? "menu-item active-menu"

                : "menu-item"

            }

            onClick={() => {

              setActivePage(
                "aiAssistant"
              );

            }}

          >

            ✨

            <span>

              AI Assistant

            </span>

          </div>


          {/* INSIGHTS */}

          <div className="menu-item">

            📊

            <span>

              Insights

            </span>

          </div>


          {/* SETTINGS */}

          <div className="menu-item">

            ⚙

            <span>

              Settings

            </span>

          </div>


        </nav>


        {/* AI MAGIC */}

        <div className="magic-box">

          <h4 className="magic-title">

            ✨ AI Magic Input

          </h4>


          <p>

            Describe your incident in your own words

            and let our AI understand and fill the

            form intelligently.

          </p>


          <button

            type="button"

            onClick={() => {

              setActivePage(
                "newClaim"
              );

              setCurrentStep(2);

            }}

          >

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

              {activePage === "myClaims"

                ? "My "

                : activePage === "claimTracking"

                ? "Claim "

                : activePage === "templates"

                ? "Claim "

                : activePage === "aiAssistant"

                ? "AI "

                : "Create "}


              <span>

                {activePage === "myClaims"

                  ? "Claims"

                  : activePage === "claimTracking"

                  ? "Tracking"

                  : activePage === "templates"

                  ? "Templates"

                  : activePage === "aiAssistant"

                  ? "Assistant"

                  : "Insurance Claim"}

              </span>

            </h1>


            <p>

              We're here to simplify the process for you ✨

            </p>

          </div>


          <div className="header-right">


            <button

              type="button"

              className="header-icon"

            >

              ?

            </button>


            {/* =========================
                NOTIFICATION
                ========================= */}

            <div className="notification-wrapper">


              <button

                type="button"

                className="header-icon notification-button"

                onClick={() => {

                  setShowNotifications(
                    !showNotifications
                  );


                  setTimeout(

                    updateNotificationCount,

                    50

                  );

                }}

              >

                🔔


                {notificationCount > 0 && (

                  <span className="notification-count">

                    {notificationCount > 9

                      ? "9+"

                      : notificationCount}

                  </span>

                )}

              </button>


              {showNotifications && (

                <Notifications

                  onClose={() =>
                    setShowNotifications(false)
                  }

                />

              )}

            </div>


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


        {/* =========================
            TEMPLATES PAGE
            ========================= */}

        {activePage === "templates" ? (

          <Templates

            onBack={() => {

              setActivePage("newClaim");

              setCurrentStep(2);

            }}

          />

        ) : activePage === "aiAssistant" ? (


          /* =========================
             AI ASSISTANT PAGE
             ========================= */

          <AIAssistant

            onBack={() => {

              setActivePage("newClaim");

              setCurrentStep(2);

            }}

          />


        ) : activePage === "claimTracking" ? (


          /* ================= TRACKING ================= */

          <ClaimTracking

            claim={
              trackingClaim
            }

            onBack={() => {

              setActivePage(
                "myClaims"
              );

            }}

          />


        ) : activePage === "myClaims" ? (


          /* ================= MY CLAIMS ================= */

          <MyClaims

            onCreateNewClaim={
              handleNewClaim
            }

            onRestoreDraft={
              handleLoadDraft
            }

            onTrackClaim={
              handleTrackClaim
            }

          />


        ) : (


          /* ================= NEW CLAIM ================= */

          <>


            {/* STEPPER */}

            <div className="stepper">


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


            {/* DRAFT MESSAGE */}

            {draftLoaded && (

              <div className="draft-loaded-message">

                ✓ Saved draft loaded successfully.

              </div>

            )}


            {/* CONTENT */}

            <div className="content-layout">


              <div className="main-form">


                {currentStep === 2 && (

                  <BasicForm

                    initialData={
                      formData
                    }

                    onContinue={
                      handleIncidentContinue
                    }

                  />

                )}


                {currentStep === 3 && (

                  <VehicleDamage

                    initialData={
                      formData
                    }

                    onBack={
                      handleVehicleBack
                    }

                    onContinue={
                      handleVehicleContinue
                    }

                  />

                )}


                {currentStep === 4 && (

                  <ReviewForm

                    incidentData={
                      formData
                    }

                    vehicleData={
                      formData
                    }

                    onBack={
                      handleReviewBack
                    }

                    onEditIncident={
                      handleEditIncident
                    }

                    onEditVehicle={
                      handleEditVehicle
                    }

                    onNewClaim={
                      handleNewClaim
                    }

                  />

                )}


                {currentStep !== 4 && (

                  <button

                    type="button"

                    className="complete-draft-button"

                    onClick={
                      handleSaveCompleteDraft
                    }

                  >

                    💾 Save Complete Claim Draft

                  </button>

                )}


              </div>


              {/* AI SUMMARY */}

              <AISummary

                formData={
                  formData
                }

                onEditIncident={
                  handleEditIncident
                }

              />


            </div>


          </>

        )}


      </main>

    </div>

  );

}


export default App;