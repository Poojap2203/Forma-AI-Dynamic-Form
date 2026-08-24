 import { useState } from "react";

function Settings({ onBack }) {

  /* =========================
     PROFILE
     ========================= */

  const [name, setName] = useState(
    localStorage.getItem("formaAI_name") ||
      "Anjali Sharma"
  );

  const [email, setEmail] = useState(
    localStorage.getItem("formaAI_email") ||
      "anjali@example.com"
  );

  const [accountType, setAccountType] = useState(
    localStorage.getItem("formaAI_accountType") ||
      "Policy Holder"
  );


  /* =========================
     NOTIFICATIONS
     ========================= */

  const [emailNotifications, setEmailNotifications] =
    useState(
      localStorage.getItem(
        "formaAI_emailNotifications"
      ) !== "false"
    );

  const [claimNotifications, setClaimNotifications] =
    useState(
      localStorage.getItem(
        "formaAI_claimNotifications"
      ) !== "false"
    );

  const [reminderNotifications, setReminderNotifications] =
    useState(
      localStorage.getItem(
        "formaAI_reminderNotifications"
      ) !== "false"
    );


  /* =========================
     APPLICATION PREFERENCES
     ========================= */

  const [aiAssistant, setAiAssistant] =
    useState(
      localStorage.getItem(
        "formaAI_aiAssistant"
      ) !== "false"
    );

  const [theme, setTheme] = useState(
    localStorage.getItem(
      "formaAI_theme"
    ) || "Light"
  );


  /* =========================
     CLAIM SETTINGS
     ========================= */

  const [saveDraft, setSaveDraft] =
    useState(
      localStorage.getItem(
        "formaAI_saveDraft"
      ) !== "false"
    );

  const [autoSave, setAutoSave] =
    useState(
      localStorage.getItem(
        "formaAI_autoSave"
      ) !== "false"
    );

  const [draftReminder, setDraftReminder] =
    useState(
      localStorage.getItem(
        "formaAI_draftReminder"
      ) !== "false"
    );


  /* =========================
     SECURITY
     ========================= */

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [passwordMessage, setPasswordMessage] =
    useState("");


  /* =========================
     PROFILE SAVE
     ========================= */

  const handleSaveProfile = () => {

    localStorage.setItem(
      "formaAI_name",
      name
    );

    localStorage.setItem(
      "formaAI_email",
      email
    );

    localStorage.setItem(
      "formaAI_accountType",
      accountType
    );

    alert(
      "Profile settings saved successfully!"
    );
  };


  /* =========================
     NOTIFICATION TOGGLES
     ========================= */

  const toggleEmailNotifications = () => {

    const value = !emailNotifications;

    setEmailNotifications(value);

    localStorage.setItem(
      "formaAI_emailNotifications",
      String(value)
    );
  };


  const toggleClaimNotifications = () => {

    const value = !claimNotifications;

    setClaimNotifications(value);

    localStorage.setItem(
      "formaAI_claimNotifications",
      String(value)
    );
  };


  const toggleReminderNotifications = () => {

    const value = !reminderNotifications;

    setReminderNotifications(value);

    localStorage.setItem(
      "formaAI_reminderNotifications",
      String(value)
    );
  };


  /* =========================
     AI ASSISTANT TOGGLE
     ========================= */

  const toggleAIAssistant = () => {

    const value = !aiAssistant;

    setAiAssistant(value);

    localStorage.setItem(
      "formaAI_aiAssistant",
      String(value)
    );
  };


  /* =========================
     THEME
     ========================= */

  const handleThemeChange = (event) => {

    const value = event.target.value;

    setTheme(value);

    localStorage.setItem(
      "formaAI_theme",
      value
    );
  };


  /* =========================
     CLAIM SETTINGS TOGGLES
     ========================= */

  const toggleSaveDraft = () => {

    const value = !saveDraft;

    setSaveDraft(value);

    localStorage.setItem(
      "formaAI_saveDraft",
      String(value)
    );
  };


  const toggleAutoSave = () => {

    const value = !autoSave;

    setAutoSave(value);

    localStorage.setItem(
      "formaAI_autoSave",
      String(value)
    );
  };


  const toggleDraftReminder = () => {

    const value = !draftReminder;

    setDraftReminder(value);

    localStorage.setItem(
      "formaAI_draftReminder",
      String(value)
    );
  };


  /* =========================
     SAVE CLAIM SETTINGS
     ========================= */

  const handleSaveClaimSettings = () => {

    localStorage.setItem(
      "formaAI_saveDraft",
      String(saveDraft)
    );

    localStorage.setItem(
      "formaAI_autoSave",
      String(autoSave)
    );

    localStorage.setItem(
      "formaAI_draftReminder",
      String(draftReminder)
    );

    alert(
      "Claim settings saved successfully!"
    );
  };


  /* =========================
     CHANGE PASSWORD
     ========================= */

  const handleChangePassword = () => {

    setPasswordMessage("");

    if (!newPassword || !confirmPassword) {

      setPasswordMessage(
        "Please enter the new password and confirm password."
      );

      return;
    }


    if (newPassword.length < 6) {

      setPasswordMessage(
        "New password must contain at least 6 characters."
      );

      return;
    }


    if (newPassword !== confirmPassword) {

      setPasswordMessage(
        "New password and confirm password do not match."
      );

      return;
    }


    const savedPassword =
      localStorage.getItem(
        "formaAI_password"
      );


    /*
      If a password already exists,
      current password must match.
    */

    if (
      savedPassword &&
      currentPassword !== savedPassword
    ) {

      setPasswordMessage(
        "Current password is incorrect."
      );

      return;
    }


    /*
      Save new password.
    */

    localStorage.setItem(
      "formaAI_password",
      newPassword
    );


    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setPasswordMessage(
      "Password changed successfully!"
    );
  };


  /* =========================
     RESET SETTINGS
     ========================= */

  const handleResetSettings = () => {

    const confirmReset =
      window.confirm(
        "Are you sure you want to reset all settings?"
      );

    if (!confirmReset) {
      return;
    }


    setName("Anjali Sharma");
    setEmail("anjali@example.com");
    setAccountType("Policy Holder");

    setEmailNotifications(true);
    setClaimNotifications(true);
    setReminderNotifications(true);

    setAiAssistant(true);
    setTheme("Light");

    setSaveDraft(true);
    setAutoSave(true);
    setDraftReminder(true);


    localStorage.removeItem(
      "formaAI_name"
    );

    localStorage.removeItem(
      "formaAI_email"
    );

    localStorage.removeItem(
      "formaAI_accountType"
    );

    localStorage.removeItem(
      "formaAI_emailNotifications"
    );

    localStorage.removeItem(
      "formaAI_claimNotifications"
    );

    localStorage.removeItem(
      "formaAI_reminderNotifications"
    );

    localStorage.removeItem(
      "formaAI_aiAssistant"
    );

    localStorage.removeItem(
      "formaAI_theme"
    );

    localStorage.removeItem(
      "formaAI_saveDraft"
    );

    localStorage.removeItem(
      "formaAI_autoSave"
    );

    localStorage.removeItem(
      "formaAI_draftReminder"
    );


    alert(
      "Settings reset successfully!"
    );
  };


  return (

    <div className="settings-page">


      {/* =========================
          SETTINGS HEADER
          ========================= */}

      <div className="settings-header">

        <div>

          <h2>
            Settings
          </h2>

          <p>
            Manage your account and application preferences
          </p>

        </div>


        <button
          type="button"
          className="settings-back-button"
          onClick={onBack}
        >
          ← Back
        </button>

      </div>


      {/* =========================
          PROFILE
          ========================= */}

      <div className="settings-card">

        <div className="settings-card-header">

          <div className="settings-section-icon">
            👤
          </div>

          <div>

            <h3>
              Profile
            </h3>

            <p>
              Manage your personal information
            </p>

          </div>

        </div>


        <div className="settings-grid">

          <div className="settings-field">

            <label>
              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />

          </div>


          <div className="settings-field">

            <label>
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </div>


          <div className="settings-field">

            <label>
              Account Type
            </label>

            <select
              value={accountType}
              onChange={(e) =>
                setAccountType(
                  e.target.value
                )
              }
            >

              <option value="Policy Holder">
                Policy Holder
              </option>

              <option value="Vehicle Owner">
                Vehicle Owner
              </option>

              <option value="Business Account">
                Business Account
              </option>

              <option value="Administrator">
                Administrator
              </option>

            </select>

          </div>

        </div>


        <button
          type="button"
          className="settings-primary-button"
          onClick={handleSaveProfile}
        >
          Save Profile
        </button>

      </div>


      {/* =========================
          NOTIFICATIONS
          ========================= */}

      <div className="settings-card">

        <div className="settings-card-header">

          <div className="settings-section-icon">
            🔔
          </div>

          <div>

            <h3>
              Notifications
            </h3>

            <p>
              Control how you receive notifications
            </p>

          </div>

        </div>


        <div className="settings-options">


          {/* EMAIL */}

          <div className="settings-option">

            <div>

              <strong>
                Email Notifications
              </strong>

              <span>
                Receive important updates through email
              </span>

            </div>


            <button
              type="button"
              className={
                emailNotifications
                  ? "settings-toggle on"
                  : "settings-toggle"
              }
              onClick={
                toggleEmailNotifications
              }
            >
              <span></span>
            </button>

          </div>


          {/* CLAIM */}

          <div className="settings-option">

            <div>

              <strong>
                Claim Notifications
              </strong>

              <span>
                Get updates when your claim status changes
              </span>

            </div>


            <button
              type="button"
              className={
                claimNotifications
                  ? "settings-toggle on"
                  : "settings-toggle"
              }
              onClick={
                toggleClaimNotifications
              }
            >
              <span></span>
            </button>

          </div>


          {/* REMINDER */}

          <div className="settings-option">

            <div>

              <strong>
                Reminder Notifications
              </strong>

              <span>
                Receive reminders for pending claim actions
              </span>

            </div>


            <button
              type="button"
              className={
                reminderNotifications
                  ? "settings-toggle on"
                  : "settings-toggle"
              }
              onClick={
                toggleReminderNotifications
              }
            >
              <span></span>
            </button>

          </div>

        </div>

      </div>


      {/* =========================
          APPLICATION PREFERENCES
          ========================= */}

      <div className="settings-card">

        <div className="settings-card-header">

          <div className="settings-section-icon">
            ⚙️
          </div>

          <div>

            <h3>
              Application Preferences
            </h3>

            <p>
              Customize your Forma AI experience
            </p>

          </div>

        </div>


        <div className="settings-options">


          {/* AI ASSISTANT */}

          <div className="settings-option">

            <div>

              <strong>
                AI Assistant
              </strong>

              <span>
                Enable AI-powered claim assistance and suggestions
              </span>

            </div>


            <button
              type="button"
              className={
                aiAssistant
                  ? "settings-toggle on"
                  : "settings-toggle"
              }
              onClick={
                toggleAIAssistant
              }
            >
              <span></span>
            </button>

          </div>


          {/* THEME */}

          <div className="settings-option">

            <div>

              <strong>
                Application Theme
              </strong>

              <span>
                Choose your preferred appearance
              </span>

            </div>


            <select
              className="settings-small-select"
              value={theme}
              onChange={
                handleThemeChange
              }
            >

              <option value="Light">
                Light
              </option>

              <option value="Dark">
                Dark
              </option>

              <option value="System Default">
                System Default
              </option>

            </select>

          </div>

        </div>

      </div>


      {/* =========================
          CLAIM SETTINGS
          ========================= */}

      <div className="settings-card">

        <div className="settings-card-header">

          <div className="settings-section-icon">
            📋
          </div>

          <div>

            <h3>
              Claim Settings
            </h3>

            <p>
              Manage your claim and draft preferences
            </p>

          </div>

        </div>


        <div className="settings-options">


          {/* SAVE CLAIM DRAFT */}

          <div className="settings-option">

            <div>

              <strong>
                Save Claim Draft
              </strong>

              <span>
                Allow unfinished claims to be saved as drafts
              </span>

            </div>


            <button
              type="button"
              className={
                saveDraft
                  ? "settings-toggle on"
                  : "settings-toggle"
              }
              onClick={
                toggleSaveDraft
              }
            >
              <span></span>
            </button>

          </div>


          {/* AUTOMATIC SAVE */}

          <div className="settings-option">

            <div>

              <strong>
                Automatic Save
              </strong>

              <span>
                Automatically save claim information while filling
              </span>

            </div>


            <button
              type="button"
              className={
                autoSave
                  ? "settings-toggle on"
                  : "settings-toggle"
              }
              onClick={
                toggleAutoSave
              }
            >
              <span></span>
            </button>

          </div>


          {/* DRAFT REMINDER */}

          <div className="settings-option">

            <div>

              <strong>
                Draft Reminder
              </strong>

              <span>
                Remind you when you have an unfinished claim
              </span>

            </div>


            <button
              type="button"
              className={
                draftReminder
                  ? "settings-toggle on"
                  : "settings-toggle"
              }
              onClick={
                toggleDraftReminder
              }
            >
              <span></span>
            </button>

          </div>

        </div>


        <button
          type="button"
          className="settings-primary-button"
          onClick={
            handleSaveClaimSettings
          }
        >
          Save Claim Settings
        </button>

      </div>


      {/* =========================
          SECURITY
          ========================= */}

      <div className="settings-card">

        <div className="settings-card-header">

          <div className="settings-section-icon">
            🔒
          </div>

          <div>

            <h3>
              Security
            </h3>

            <p>
              Keep your Forma AI account secure
            </p>

          </div>

        </div>


        <div className="password-section">


          <div className="settings-field">

            <label>
              Current Password
            </label>

            <input
              type="password"
              value={currentPassword}
              onChange={(e) =>
                setCurrentPassword(
                  e.target.value
                )
              }
              placeholder="Enter current password"
            />

          </div>


          <div className="settings-field">

            <label>
              New Password
            </label>

            <input
              type="password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(
                  e.target.value
                )
              }
              placeholder="Enter new password"
            />

          </div>


          <div className="settings-field">

            <label>
              Confirm New Password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              placeholder="Confirm new password"
            />

          </div>


          {passwordMessage && (

            <div
              className={
                passwordMessage.includes(
                  "successfully"
                )
                  ? "settings-success-message"
                  : "settings-error-message"
              }
            >
              {passwordMessage}
            </div>

          )}


          <button
            type="button"
            className="settings-primary-button"
            onClick={
              handleChangePassword
            }
          >
            Change Password
          </button>

        </div>

      </div>


      {/* =========================
          RESET SETTINGS
          ========================= */}

      <div className="settings-danger-card">

        <div>

          <h3>
            Reset Settings
          </h3>

          <p>
            Restore all application settings to default values.
          </p>

        </div>


        <button
          type="button"
          className="settings-danger-button"
          onClick={
            handleResetSettings
          }
        >
          Reset Settings
        </button>

      </div>

    </div>
  );
}

export default Settings;