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

import { extractClaim } from "./services/api";

function App() {
  /*CURRENT STEP */

  const [currentStep, setCurrentStep] = useState(2);

  /*PROFILE*/

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

  /*PROFILE INITIAL */

  const profileInitial =
    profileName && profileName.trim().length > 0
      ? profileName.trim().charAt(0).toUpperCase()
      : "A";

  /*LOAD PROFILE */

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

  /*PROFILE UPDATE EVENT */

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

  /* UPDATE PROFILE PICTURE*/

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

  /*  
     REMOVE PROFILE PICTURE*/

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

  /*OPEN PROFILE SETTINGS*/

  const handleOpenProfileSettings = () => {
    setShowProfileMenu(false);
    setActivePage("settings");
  };

  /*NOTIFICATIONS*/

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

  /* PAGE STATE*/

  const [activePage, setActivePage] =
    useState("newClaim");

  const [trackingClaim, setTrackingClaim] =
    useState(null);

  const [draftLoaded, setDraftLoaded] =
    useState(false);

  /* FORM DATA*/

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

   const [aiText, setAiText] = useState("");
   const [aiLoading, setAiLoading] = useState(false);
 
/* AI CLAIM EXTRACTION */
 

 const handleAIExtraction = async (text) => {
  if (!text || !text.trim()) {
    alert("Please describe your incident first.");
    return null;
  }

  try {
    const response = await extractClaim(text);

    if (!response?.success || !response?.data) {
      throw new Error(
        response?.message || "Unable to extract claim information."
      );
    }

    const extracted = response.data;

    const updatedData = {
      incidentType: extracted.incidentType || "",
      date: extracted.incidentDate || "",
      time: extracted.incidentTime || "",
      location: extracted.location || "",

      // BasicForm uses lowercase "yes" / "no"
      injured:
        typeof extracted.injured === "boolean"
          ? extracted.injured
            ? "yes"
            : "no"
          : extracted.injured || "",

      person: extracted.injuredPerson || "",
      injury: extracted.injuryDescription || "",

      // BasicForm uses lowercase "yes" / "no"
      policeReport:
        typeof extracted.policeReportFiled === "boolean"
          ? extracted.policeReportFiled
            ? "yes"
            : "no"
          : extracted.policeReportFiled || "",

      description: extracted.incidentDescription || "",

      vehicleMake: "",
      vehicleModel: "",
      registration: extracted.vehicleNumber || "",
      damageType: "",
      severity: extracted.severity || "",
      damageDescription: extracted.damageDescription || "",
    };

    // -----------------------------
    // VEHICLE MAKE / MODEL
    // -----------------------------
    if (extracted.vehicle) {
      const vehicleText = String(extracted.vehicle).toLowerCase();

      const vehicleData = {
        "Maruti Suzuki": [
          "Alto",
          "Swift",
          "Baleno",
          "Dzire",
          "WagonR",
          "Brezza",
          "Ertiga",
          "Ciaz",
          "Grand Vitara",
        ],
        Hyundai: [
          "i10",
          "Grand i10",
          "i20",
          "Venue",
          "Creta",
          "Verna",
          "Aura",
          "Exter",
          "Alcazar",
          "Tucson",
        ],
        Honda: [
          "City",
          "Amaze",
          "Elevate",
          "Jazz",
          "Civic",
          "WR-V",
        ],
        Tata: [
          "Nexon",
          "Punch",
          "Altroz",
          "Harrier",
          "Safari",
          "Tiago",
          "Tigor",
        ],
        Mahindra: [
          "Thar",
          "Scorpio",
          "XUV300",
          "XUV400",
          "XUV700",
          "Bolero",
        ],
        Toyota: [
          "Fortuner",
          "Innova",
          "Glanza",
          "Urban Cruiser",
          "Hyryder",
        ],
        Kia: [
          "Seltos",
          "Sonet",
          "Carens",
          "EV6",
        ],
        MG: [
          "Hector",
          "Astor",
          "Gloster",
          "ZS EV",
        ],
        Renault: [
          "Kwid",
          "Kiger",
          "Triber",
          "Duster",
        ],
        Volkswagen: [
          "Polo",
          "Virtus",
          "Taigun",
          "Tiguan",
        ],
        Skoda: [
          "Slavia",
          "Kushaq",
          "Kodiaq",
          "Superb",
        ],
        Nissan: [
          "Magnite",
          "Kicks",
        ],
        Ford: [
          "EcoSport",
          "Endeavour",
          "Figo",
          "Aspire",
        ],
        Chevrolet: [
          "Beat",
          "Cruze",
          "Spark",
        ],
        Jeep: [
          "Compass",
          "Meridian",
          "Wrangler",
        ],
        BMW: [
          "3 Series",
          "5 Series",
          "X1",
          "X3",
          "X5",
        ],
        "Mercedes-Benz": [
          "C-Class",
          "E-Class",
          "GLA",
          "GLC",
        ],
        Audi: [
          "A4",
          "A6",
          "Q3",
          "Q5",
        ],
        Volvo: [
          "XC40",
          "XC60",
          "XC90",
        ],
        Tesla: [
          "Model 3",
          "Model Y",
          "Model S",
          "Model X",
        ],
        "Land Rover": [
          "Defender",
          "Range Rover",
          "Discovery",
        ],
      };

      const matchedMake = Object.keys(vehicleData).find((make) =>
        vehicleText.includes(make.toLowerCase())
      );

      if (matchedMake) {
        updatedData.vehicleMake = matchedMake;

        const matchedModel = vehicleData[matchedMake].find((model) =>
          vehicleText.includes(model.toLowerCase())
        );

        if (matchedModel) {
          updatedData.vehicleModel = matchedModel;
        }
      }
    }

    // -----------------------------
    // DAMAGE TYPE
    // -----------------------------
    if (Array.isArray(extracted.damage)) {
      const damageText = extracted.damage
        .join(" ")
        .toLowerCase();

      if (damageText.includes("front bumper")) {
        updatedData.damageType = "Front Bumper";
      } else if (damageText.includes("rear bumper")) {
        updatedData.damageType = "Rear Bumper";
      } else if (
        damageText.includes("windshield") ||
        damageText.includes("windscreen")
      ) {
        updatedData.damageType = "Windshield";
      } else if (
        damageText.includes("side door") ||
        damageText.includes("door")
      ) {
        updatedData.damageType = "Side Door";
      } else if (extracted.damage.length > 1) {
        updatedData.damageType = "Multiple Areas";
      } else if (extracted.damage.length === 1) {
        updatedData.damageType = "Other";
      }
    }

    // -----------------------------
    // UPDATE EXISTING FORM
    // -----------------------------
    setFormData((previous) => ({
      ...previous,
      ...updatedData,
    }));

    setDraftLoaded(false);

    // Keep existing flow
    setActivePage("newClaim");
    setCurrentStep(2);

    alert("✨ Claim information extracted successfully!");

    return updatedData;
  } catch (error) {
    console.error("AI Extraction Error:", error);

    alert(
      error.message ||
        "Unable to extract claim information. Please make sure the backend is running."
    );

    return null;
  }
};

  /* INCIDENT*/

  const handleIncidentContinue = (data) => {
    setFormData((previous) => ({
      ...previous,
      ...data
    }));

    setCurrentStep(3);
  };

  /*VEHICLE */

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

  /* EDIT CLAIM*/

  const handleEditIncident = () => {
    setActivePage("newClaim");
    setCurrentStep(2);
  };

  const handleEditVehicle = () => {
    setActivePage("newClaim");
    setCurrentStep(3);
  };

  /*SAVE COMPLETE DRAFT*/

  const handleSaveCompleteDraft = () => {
    localStorage.setItem(
      "formaAI_complete_draft",
      JSON.stringify(formData)
    );

    alert(
      "Complete claim draft saved successfully!"
    );
  };

  /*LOAD DRAFT */

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

  /* NEW CLAIM*/

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

  /*TRACK CLAIM */

  const handleTrackClaim = (claim) => {
    setTrackingClaim(claim);
    setActivePage("claimTracking");
  };

  /* USE TEMPLATE*/

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

      {/*SIDEBAR*/}
 <aside
  className={`sidebar ${
    activePage === "newClaim" ? "compact-sidebar" : ""
  }`}
>

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

        <div className="magic-box">
  <h4 className="magic-title">✨ AI Magic Input</h4>

  <p>
    Describe your incident in your own words
    and let our AI understand and fill the
    form intelligently.
  </p>

  <textarea
    value={aiText}
    onChange={(e) => setAiText(e.target.value)}
    placeholder="Example: My car met with an accident yesterday in Bhopal..."
    rows="4"
  />

  <button
    type="button"
    onClick={() => handleAIExtraction(aiText)}
  >
    ✨ Extract Claim
  </button>
</div>

        {/*SIDEBAR PROFILE*/}

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

      {/*MAIN CONTENT */}

      <main className="main-content">
        <div className="claim-hero">

    <img
      src="/insurance-hero.png"
      alt="Insurance protection with car"
      className="claim-hero-image"
    />

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

            {/* NOTIFICATIONS */}

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

            {/* HEADER PROFILE */}

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

              {/* HEADER PROFILE DROPDOWN DIRECTLY BELOW PROFILE
               */}

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
        </div>
      
    

        {/* PAGE CONTENT */}

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

          /*NEW CLAIM*/

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