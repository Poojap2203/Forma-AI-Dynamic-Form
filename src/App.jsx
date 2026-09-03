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
import Insights from "./components/Insights";
import Settings from "./components/Settings";

function App() {
  /* =====================================================
     CURRENT STEP
  ===================================================== */

  const [currentStep, setCurrentStep] = useState(2);

  /* =====================================================
     PROFILE
  ===================================================== */

  const [profileName, setProfileName] = useState(
    localStorage.getItem("formaAI_name") || "Anjali Raghuwanshi"
  );

  const [profileEmail, setProfileEmail] = useState(
    localStorage.getItem("formaAI_email") || "anjali@example.com"
  );

  const [profilePicture, setProfilePicture] = useState(
    localStorage.getItem("formaAI_profilePicture") || ""
  );

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  /* =====================================================
     PROFILE INITIAL
  ===================================================== */

  const profileInitial =
    profileName && profileName.trim().length > 0
      ? profileName.trim().charAt(0).toUpperCase()
      : "A";

  /* =====================================================
     LOAD PROFILE
  ===================================================== */

  const loadProfile = () => {
    setProfileName(
      localStorage.getItem("formaAI_name") ||
        "Anjali Raghuwanshi"
    );

    setProfileEmail(
      localStorage.getItem("formaAI_email") ||
        "anjali@example.com"
    );

    setProfilePicture(
      localStorage.getItem("formaAI_profilePicture") || ""
    );
  };

  /* =====================================================
     PROFILE UPDATE EVENT
  ===================================================== */

  useEffect(() => {
    loadProfile();

    const handleProfileUpdated = () => {
      loadProfile();
    };

    window.addEventListener(
      "formaAI_profile_updated",
      handleProfileUpdated
    );

    return () => {
      window.removeEventListener(
        "formaAI_profile_updated",
        handleProfileUpdated
      );
    };
  }, []);

  /* =====================================================
     UPDATE PROFILE PICTURE
  ===================================================== */

  const handleUpdateProfile = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Please select an image smaller than 5 MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const imageData = reader.result;

      localStorage.setItem(
        "formaAI_profilePicture",
        imageData
      );

      setProfilePicture(imageData);
      setShowProfileMenu(false);

      window.dispatchEvent(
        new Event("formaAI_profile_updated")
      );
    };

    reader.readAsDataURL(file);

    event.target.value = "";
  };

  /* =====================================================
     REMOVE PROFILE PICTURE
  ===================================================== */

  const handleRemoveProfile = () => {
    const confirmRemove = window.confirm(
      "Are you sure you want to remove your profile picture?"
    );

    if (!confirmRemove) {
      return;
    }

    localStorage.removeItem(
      "formaAI_profilePicture"
    );

    setProfilePicture("");
    setShowProfileMenu(false);

    window.dispatchEvent(
      new Event("formaAI_profile_updated")
    );
  };

  /* =====================================================
     OPEN PROFILE SETTINGS
  ===================================================== */

  const handleOpenProfileSettings = () => {
    setShowProfileMenu(false);
    setActivePage("settings");
  };

  /* =====================================================
     NOTIFICATIONS
  ===================================================== */

  const [showNotifications, setShowNotifications] =
    useState(false);

  const [notificationCount, setNotificationCount] =
    useState(0);

  const updateNotificationCount = () => {
    try {
      const notifications = JSON.parse(
        localStorage.getItem(
          "formaAI_notifications"
        ) || "[]"
      );

      const unread = notifications.filter(
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

  /* =====================================================
     PAGE STATE
  ===================================================== */

  const [activePage, setActivePage] =
    useState("newClaim");

  const [trackingClaim, setTrackingClaim] =
    useState(null);

  const [draftLoaded, setDraftLoaded] =
    useState(false);

  /* =====================================================
     FORM DATA
  ===================================================== */

  const emptyFormData = {
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
  };

  const [formData, setFormData] =
    useState(emptyFormData);

  /* =====================================================
     INCIDENT
  ===================================================== */

  const handleIncidentContinue = (data) => {
    setFormData((previous) => ({
      ...previous,
      ...data
    }));

    setCurrentStep(3);
  };

  /* =====================================================
     VEHICLE
  ===================================================== */

  const handleVehicleContinue = (data) => {
    setFormData((previous) => ({
      ...previous,
      ...data
    }));

    setCurrentStep(4);
  };

  const handleVehicleBack = () => {
    setCurrentStep(2);
  };

  const handleReviewBack = () => {
    setCurrentStep(3);
  };

  /* =====================================================
     EDIT CLAIM
  ===================================================== */

  const handleEditIncident = () => {
    setActivePage("newClaim");
    setCurrentStep(2);
  };

  const handleEditVehicle = () => {
    setActivePage("newClaim");
    setCurrentStep(3);
  };

  /* =====================================================
     SAVE COMPLETE DRAFT
  ===================================================== */

  const handleSaveCompleteDraft = () => {
    localStorage.setItem(
      "formaAI_complete_draft",
      JSON.stringify(formData)
    );

    alert(
      "Complete claim draft saved successfully!"
    );
  };

  /* =====================================================
     LOAD DRAFT
  ===================================================== */

  const handleLoadDraft = () => {
    try {
      const completeDraft = JSON.parse(
        localStorage.getItem(
          "formaAI_complete_draft"
        ) || "null"
      );

      const incidentDraft = JSON.parse(
        localStorage.getItem(
          "formaAI_incident_draft"
        ) || "null"
      );

      const vehicleDraft = JSON.parse(
        localStorage.getItem(
          "formaAI_vehicle_draft"
        ) || "null"
      );

      if (
        !completeDraft &&
        !incidentDraft &&
        !vehicleDraft
      ) {
        alert("No saved draft found.");
        return;
      }

      setFormData((previous) => ({
        ...previous,
        ...(completeDraft || {}),
        ...(incidentDraft || {}),
        ...(vehicleDraft || {})
      }));

      setDraftLoaded(true);
      setActivePage("newClaim");
      setCurrentStep(2);
    } catch (error) {
      console.error(error);

      alert(
        "Unable to load the saved draft."
      );
    }
  };

  /* =====================================================
     NEW CLAIM
  ===================================================== */

  const handleNewClaim = () => {
    setActivePage("newClaim");
    setTrackingClaim(null);
    setDraftLoaded(false);
    setFormData(emptyFormData);
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

  /* =====================================================
     TRACK CLAIM
  ===================================================== */

  const handleTrackClaim = (claim) => {
    setTrackingClaim(claim);
    setActivePage("claimTracking");
  };

  /* =====================================================
     USE TEMPLATE
  ===================================================== */

  const handleUseTemplate = (template) => {
    setDraftLoaded(false);

    if (
      template.title === "Vehicle Accident"
    ) {
      setFormData((previous) => ({
        ...previous,

        incidentType: "Road Accident",

        description:
          "I was involved in a vehicle accident and need to report the incident.",

        damageType: "Collision",

        severity: "Moderate"
      }));

      setActivePage("newClaim");
      setCurrentStep(2);

      return;
    }

    if (
      template.title === "Vehicle Damage"
    ) {
      setFormData((previous) => ({
        ...previous,

        incidentType: "Other",

        description:
          "My vehicle has been damaged and I want to submit an insurance claim.",

        damageType: "Vehicle Damage",

        severity: "Minor"
      }));

      setActivePage("newClaim");
      setCurrentStep(3);

      return;
    }

    if (
      template.title === "Insurance Claim"
    ) {
      setFormData((previous) => ({
        ...previous,

        incidentType: "Other",

        description:
          "I want to submit a complete insurance claim for my vehicle.",

        damageType: "",

        severity: ""
      }));

      setActivePage("newClaim");
      setCurrentStep(4);

      return;
    }
  };

  /* =====================================================
     CLOSE TEMPLATES
  ===================================================== */

  const handleCloseTemplates = () => {
    setActivePage("newClaim");
    setCurrentStep(2);
  };

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div className="app">

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <aside className="sidebar">

        {/* LOGO */}

        <div className="logo-area">
          <div className="logo-icon">
            ✨
          </div>

          <div>
            <h2>Forma AI</h2>

            <span>
              Smart Claims Assistant
            </span>
          </div>
        </div>

        {/* SIDEBAR MENU */}

        <nav className="sidebar-menu">

          {/* DASHBOARD */}

          <div
            className="menu-item"
            onClick={() => {
              setActivePage("newClaim");
              setCurrentStep(2);
            }}
          >
            🏠
            <span>Dashboard</span>
          </div>

          {/* NEW CLAIM */}

          <div
            className={
              activePage === "newClaim"
                ? "menu-item active-menu"
                : "menu-item"
            }
            onClick={() => {
              setActivePage("newClaim");
              setCurrentStep(2);
            }}
          >
            ＋
            <span>New Claim</span>
          </div>

          {/* MY CLAIMS */}

          <div
            className={
              activePage === "myClaims"
                ? "menu-item active-menu"
                : "menu-item"
            }
            onClick={() => {
              setActivePage("myClaims");
            }}
          >
            📄
            <span>My Claims</span>
          </div>

          {/* DRAFTS */}

          <div
            className="menu-item"
            onClick={handleLoadDraft}
          >
            📋
            <span>Drafts</span>

            <span className="notification-badge">
              2
            </span>
          </div>

          {/* TEMPLATES */}

          <div
            className={
              activePage === "templates"
                ? "menu-item active-menu"
                : "menu-item"
            }
            onClick={() => {
              setActivePage("templates");
            }}
          >
            ▦
            <span>Templates</span>
          </div>

          {/* AI ASSISTANT */}

          <div
            className={
              activePage === "aiAssistant"
                ? "menu-item active-menu"
                : "menu-item"
            }
            onClick={() => {
              setActivePage("aiAssistant");
            }}
          >
            ✨
            <span>AI Assistant</span>
          </div>

          {/* INSIGHTS */}

          <div
            className={
              activePage === "insights"
                ? "menu-item active-menu"
                : "menu-item"
            }
            onClick={() => {
              setActivePage("insights");
            }}
          >
            📊
            <span>Insights</span>
          </div>

          {/* SETTINGS */}

          <div
            className={
              activePage === "settings"
                ? "menu-item active-menu"
                : "menu-item"
            }
            onClick={() => {
              setActivePage("settings");
            }}
          >
            ⚙
            <span>Settings</span>
          </div>

        </nav>

        {/* =================================================
            AI MAGIC
        ================================================= */}

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
              setActivePage("newClaim");
              setCurrentStep(2);
            }}
          >
            Try It Now →
          </button>

        </div>

        {/* =================================================
            SIDEBAR PROFILE
            STATIC ONLY — NO CLICK / NO ARROW / NO DROPDOWN
        ================================================= */}

        <div className="profile-area-wrapper">

          <div className="user-profile">

            {/* PROFILE AVATAR */}

            <div className="user-avatar">

              {profilePicture ? (
                <img
                  src={profilePicture}
                  alt="Profile"
                />
              ) : (
                <span>
                  {profileInitial}
                </span>
              )}

            </div>

            {/* USER INFO */}

            <div className="user-info">

              <strong>
                {profileName}
              </strong>

              <small>
                {profileEmail}
              </small>

            </div>

          </div>

        </div>

      </aside>

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <main className="main-content">

        {/* =================================================
            HEADER
        ================================================= */}

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
                : activePage === "insights"
                ? "Claim "
                : activePage === "settings"
                ? "Account "
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
                  : activePage === "insights"
                  ? "Insights"
                  : activePage === "settings"
                  ? "Settings"
                  : "Insurance Claim"}

              </span>

            </h1>

            <p>
              We're here to simplify the process for you ✨
            </p>

          </div>

          <div className="header-right">

            {/* HELP */}

            <button
              type="button"
              className="header-icon"
            >
              ?
            </button>

            {/* =================================================
                NOTIFICATIONS
            ================================================= */}

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

            {/* =================================================
                HEADER PROFILE
            ================================================= */}

            <div className="header-profile-wrapper">

              {/* PROFILE BUTTON */}

              <div
                className="header-user"
                onClick={() => {
                  setShowProfileMenu(
                    !showProfileMenu
                  );
                }}
              >

                {/* HEADER AVATAR */}

                <div className="header-avatar">

                  {profilePicture ? (
                    <img
                      src={profilePicture}
                      alt="Profile"
                    />
                  ) : (
                    <span>
                      {profileInitial}
                    </span>
                  )}

                </div>

                {/* FULL NAME */}

                <span className="header-user-name">
                  {profileName}
                </span>

                {/* ARROW */}

                <span>
                  {showProfileMenu
                    ? "⌃"
                    : "⌄"}
                </span>

              </div>

              {/* =================================================
                  HEADER PROFILE DROPDOWN

                  DIRECTLY BELOW PROFILE
              ================================================= */}

              {showProfileMenu && (

                <div className="header-profile-dropdown">

                  {/* DROPDOWN HEADER */}

                  <div className="profile-dropdown-header">

                    <div className="profile-dropdown-mini-avatar">

                      {profilePicture ? (
                        <img
                          src={profilePicture}
                          alt="Profile"
                        />
                      ) : (
                        <span>
                          {profileInitial}
                        </span>
                      )}

                    </div>

                    <div className="profile-dropdown-user-info">

                      <strong>
                        {profileName}
                      </strong>

                      <span>
                        {profileEmail}
                      </span>

                    </div>

                  </div>

                  {/* BUTTONS */}

                  <div className="profile-dropdown-actions">

                    {/* UPDATE PROFILE */}

                    <label
                      htmlFor="headerProfileInput"
                      className="profile-dropdown-button change-profile-button"
                      onClick={(event) => {
                        event.stopPropagation();
                      }}
                    >
                      <span>✏️</span>
                      <span>Update Profile</span>
                    </label>

                    <input
                      id="headerProfileInput"
                      type="file"
                      accept="image/*"
                      onChange={handleUpdateProfile}
                      className="profile-file-input"
                    />

                    {/* REMOVE PROFILE */}

                    <button
                      type="button"
                      className="profile-dropdown-button remove-profile-button"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleRemoveProfile();
                      }}
                    >
                      <span>🗑️</span>
                      <span>Remove</span>
                    </button>

                    {/* PROFILE SETTINGS */}

                    <button
                      type="button"
                      className="profile-dropdown-button profile-settings-button"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleOpenProfileSettings();
                      }}
                    >
                      <span>⚙️</span>
                      <span>Settings</span>
                    </button>

                  </div>

                </div>

              )}

            </div>

          </div>

        </header>
        <div className="insurance-hero-reference">
         <img
         src="/insurance-hero.png"
         alt="Insurance protection with car"
             />
               </div>

        {/* =================================================
            PAGE CONTENT
        ================================================= */}

        {activePage === "templates" ? (

          <Templates
            onClose={handleCloseTemplates}
            onUseTemplate={handleUseTemplate}
          />

        ) : activePage === "aiAssistant" ? (

          <AIAssistant
            onBack={() => {
              setActivePage("newClaim");
              setCurrentStep(2);
            }}
          />

        ) : activePage === "insights" ? (

          <Insights
            onBack={() => {
              setActivePage("newClaim");
              setCurrentStep(2);
            }}
          />

        ) : activePage === "settings" ? (

          <Settings
            onBack={() => {
              setActivePage("newClaim");
              setCurrentStep(2);
            }}
          />

        ) : activePage === "claimTracking" ? (

          <ClaimTracking
            claim={trackingClaim}
            onBack={() => {
              setActivePage("myClaims");
            }}
          />

        ) : activePage === "myClaims" ? (

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

          /* =================================================
             NEW CLAIM
          ================================================= */

          <>

            {/* STEPPER */}

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

            {/* DRAFT MESSAGE */}

            {draftLoaded && (

              <div className="draft-loaded-message">

                ✓ Saved draft loaded successfully.

              </div>

            )}

            {/* CONTENT */}

            <div className="content-layout">

              <div className="main-form">

                {/* STEP 2 */}

                {currentStep === 2 && (

                  <BasicForm
                    initialData={formData}
                    onContinue={
                      handleIncidentContinue
                    }
                  />

                )}

                {/* STEP 3 */}

                {currentStep === 3 && (

                  <VehicleDamage
                    initialData={formData}
                    onBack={
                      handleVehicleBack
                    }
                    onContinue={
                      handleVehicleContinue
                    }
                  />

                )}

                {/* STEP 4 */}

                {currentStep === 4 && (

                  <ReviewForm
                    incidentData={formData}
                    vehicleData={formData}
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

                {/* SAVE DRAFT */}

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
                formData={formData}
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