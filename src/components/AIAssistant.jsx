 import { useState } from "react";

function AIAssistant() {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi! I'm Forma AI Assistant. How can I help you with your insurance claim today?"
    }
  ]);

  // =========================
  // HELP SECTION STATE
  // =========================
  const [selectedHelp, setSelectedHelp] = useState(null);

  const suggestions = [
    "How do I file a claim?",
    "What documents do I need?",
    "How can I track my claim?",
    "Explain my claim process"
  ];

  // =========================
  // TEXT NORMALIZER
  // =========================
  const normalizeText = (text) => {
    return text
      .toLowerCase()
      .replace(/[?!.:,;]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  // =========================
  // CHECK KEYWORDS
  // =========================
  const containsAny = (text, words) => {
    return words.some((word) => text.includes(word));
  };

  // =========================
  // AI RESPONSE
  // =========================
  const getAIResponse = (text) => {
    const lowerText = normalizeText(text);

    // =========================================
    // STEP BY STEP / HOW TO FILL FORM
    // =========================================
    if (
      containsAny(lowerText, [
        "step by step",
        "steps",
        "step",
        "how to fill",
        "how do i fill",
        "fill the form",
        "fill form",
        "form kaise",
        "form kese",
        "form bhar",
        "form fill",
        "kaise bharu",
        "kese bharu"
      ])
    ) {
      return `Sure! I'll guide you through the insurance claim form step by step.

STEP 1 — Incident Details
• Select the incident type.
• Enter the date and time of the incident.
• Enter the location where the incident happened.
• Select whether anyone was injured.
• If someone was injured, provide the person's details and injury information.
• Select whether a police report was filed.
• Describe what happened in the description box.
• Click Continue.

STEP 2 — Vehicle & Damage
• Select your vehicle make.
• Select the vehicle model.
• Enter your vehicle registration number.
• Select the damaged area/type.
• Choose the damage severity.
• Describe the visible damage clearly.
• Click Continue.

STEP 3 — Review & Submit
• Carefully check all incident information.
• Check your vehicle and damage information.
• If something is wrong, use the Edit option.
• If everything is correct, submit the claim.

Tip: Enter accurate information and describe the incident in your own words.`;
    }

    // =========================================
    // INCIDENT DETAILS
    // =========================================
    if (
      containsAny(lowerText, [
        "incident details",
        "incident information",
        "incident step",
        "incident form",
        "incident section",
        "accident details",
        "accident information"
      ])
    ) {
      return `The Incident Details section is where you explain what happened.

Fill it like this:

1. Incident Type — Select the type of incident.
2. Date — Enter the date when the incident happened.
3. Time — Enter approximately when it happened.
4. Location — Enter the place where the incident occurred.
5. Injured — Select Yes or No.
6. Person — If someone was injured, enter their details.
7. Injury — Describe the injury briefly.
8. Police Report — Select Yes if a police report was filed, otherwise select No.
9. Description — Explain what happened clearly.

Example description:
"On 20 August 2026, my vehicle was involved in an accident near Vijay Nagar, Indore. The front bumper was damaged. No person was injured."

After completing these fields, click Continue.`;
    }

    // =========================================
    // INCIDENT TYPE
    // =========================================
    if (
      containsAny(lowerText, [
        "incident type",
        "what incident type",
        "which incident type",
        "incident select"
      ])
    ) {
      return `Incident Type tells the system what kind of event happened.

Choose the option that best describes your situation.

For example:
• Vehicle accident → choose the accident-related option.
• Vehicle damage without an accident → choose the appropriate damage option.
• Theft → choose the theft-related option if available.

If you are unsure, tell me what happened and I can help you understand which type matches your situation.`;
    }

    // =========================================
    // DATE
    // =========================================
    if (
      containsAny(lowerText, [
        "date field",
        "date me",
        "date mein",
        "date fill",
        "date kya",
        "which date",
        "incident date"
      ])
    ) {
      return `For the Date field, enter the date on which the incident actually happened.

Example:
If the accident happened on 20 August 2026, enter:

20/08/2026

Use the actual incident date rather than the date on which you are filling the claim.`;
    }

    // =========================================
    // TIME
    // =========================================
    if (
      containsAny(lowerText, [
        "time field",
        "time me",
        "time mein",
        "time fill",
        "which time",
        "incident time"
      ])
    ) {
      return `For the Time field, enter approximately when the incident happened.

For example:
• 10:30 AM
• 3:45 PM
• 8:15 PM

If you don't remember the exact time, use the closest accurate time you can remember.`;
    }

    // =========================================
    // LOCATION
    // =========================================
    if (
      containsAny(lowerText, [
        "location",
        "location field",
        "location me",
        "location mein",
        "where incident",
        "where accident"
      ])
    ) {
      return `For Location, enter the place where the incident happened.

You can include:
• Area or locality
• Road/street
• City
• Nearby landmark

Example:
"Vijay Nagar, AB Road, Indore, near C21 Mall"

Try to make the location specific enough to identify where the incident occurred.`;
    }

    // =========================================
    // INJURY
    // =========================================
    if (
      containsAny(lowerText, [
        "injury",
        "injured",
        "injury field",
        "injured field",
        "person injured"
      ])
    ) {
      return `The Injured section asks whether anyone was injured during the incident.

If nobody was injured:
→ Select No.

If someone was injured:
→ Select Yes.
→ Provide the person's information.
→ Describe the injury briefly.

Example:
"Passenger experienced minor shoulder pain after the accident."

Only enter information that is accurate.`;
    }

    // =========================================
    // POLICE REPORT
    // =========================================
    if (
      containsAny(lowerText, [
        "police report",
        "police",
        "fir",
        "fir report",
        "police field"
      ])
    ) {
      return `For the Police Report field:

Select Yes if a police report/FIR was actually filed for the incident.

Select No if no police report was filed.

Example:
If you reported the accident to the police and received an FIR/report → Yes.

If the accident was not reported to the police → No.

Do not select Yes unless a report was actually filed.`;
    }

    // =========================================
    // DESCRIPTION
    // =========================================
    if (
      containsAny(lowerText, [
        "description",
        "description box",
        "description field",
        "what should i write",
        "what to write",
        "kya likhu",
        "kya likhna",
        "description example",
        "incident describe",
        "describe incident"
      ])
    ) {
      return `In the Description box, explain the incident in simple chronological order.

Try to mention:
• What happened
• Where it happened
• When it happened
• How the accident/damage occurred
• Any important circumstances
• Whether anyone was injured

Example:

"On 20 August 2026 at approximately 5:30 PM, my car was involved in an accident near Vijay Nagar, Indore. Another vehicle hit the front side of my car while changing lanes. The front bumper and left headlight were damaged. No person was injured."

Keep the description factual and avoid adding information you are not sure about.`;
    }

    // =========================================
    // VEHICLE DETAILS
    // =========================================
    if (
      containsAny(lowerText, [
        "vehicle details",
        "vehicle information",
        "vehicle section",
        "vehicle form",
        "vehicle step",
        "car details"
      ])
    ) {
      return `The Vehicle & Damage section contains your vehicle information.

Fill these fields:

1. Vehicle Make — Select your vehicle manufacturer.
2. Vehicle Model — Select the model.
3. Registration — Enter the vehicle registration number.
4. Damage Type — Select the damaged area/type.
5. Severity — Choose how serious the damage is.
6. Damage Description — Explain what is damaged.

Example:
Make: Toyota
Model: Innova
Registration: MP09AB1234
Damage Type: Front Bumper
Severity: Moderate
Description: "Front bumper is cracked and partially detached on the left side."`;
    }

    // =========================================
    // VEHICLE MAKE / MODEL
    // =========================================
    if (
      containsAny(lowerText, [
        "vehicle make",
        "vehicle model",
        "make field",
        "model field",
        "car make",
        "car model"
      ])
    ) {
      return `For Vehicle Make and Model:

Vehicle Make means the manufacturer.
Examples:
• Toyota
• Honda
• Hyundai
• Maruti Suzuki
• Tata

Vehicle Model means the specific model of that manufacturer.
For example:
• Toyota → Innova
• Honda → City
• Hyundai → Creta

Select the actual make and model of your vehicle.`;
    }

    // =========================================
    // REGISTRATION
    // =========================================
    if (
      containsAny(lowerText, [
        "registration",
        "registration number",
        "vehicle number",
        "number plate",
        "car number"
      ])
    ) {
      return `For the Registration field, enter your vehicle's registration number exactly as shown on the registration/number plate.

Example:

MP09AB1234

Make sure:
• The characters are correct.
• There are no unnecessary spaces.
• You use the registration number of the vehicle involved in the claim.`;
    }

    // =========================================
    // DAMAGE TYPE
    // =========================================
    if (
      containsAny(lowerText, [
        "damage type",
        "type of damage",
        "damaged area",
        "damage field",
        "which damage"
      ])
    ) {
      return `Damage Type tells us which part of the vehicle was damaged.

Common options include:
• Front Bumper
• Rear Bumper
• Windshield
• Side Door
• Multiple Areas
• Other

Choose the option that best matches the actual damage.

If multiple parts are damaged, choose "Multiple Areas" when available.`;
    }

    // =========================================
    // DAMAGE SEVERITY
    // =========================================
    if (
      containsAny(lowerText, [
        "severity",
        "damage severity",
        "how serious",
        "severity field",
        "severity select"
      ])
    ) {
      return `Damage Severity describes how serious the vehicle damage is.

As a general guide:

Minor
→ Small scratches, light dents, or cosmetic damage.

Moderate
→ Noticeable dents, cracks, damaged bumper, or parts requiring repair.

Severe
→ Major structural damage, heavily damaged parts, or damage that may make the vehicle unsafe to drive.

Choose the option that best represents the actual condition of the vehicle.`;
    }

    // =========================================
    // DAMAGE DESCRIPTION
    // =========================================
    if (
      containsAny(lowerText, [
        "damage description",
        "describe damage",
        "damage me kya likhu",
        "damage mein kya likhu",
        "what to write in damage",
        "vehicle damage description"
      ])
    ) {
      return `In Damage Description, describe exactly what you can see.

Mention:
• Damaged part
• Type of damage
• Approximate location
• Visible condition

Example:

"The front bumper has a large crack on the left side and is partially detached. The left headlight also has visible scratches."

Another example:

"The right-side door has a deep dent and several scratches near the handle."

Avoid guessing hidden damage. Describe what you can actually observe.`;
    }

    // =========================================
    // REVIEW
    // =========================================
    if (
      containsAny(lowerText, [
        "review",
        "review step",
        "review page",
        "check before submit",
        "before submit",
        "submit step"
      ])
    ) {
      return `Before submitting your claim, carefully review everything.

Check:

✓ Incident type
✓ Date and time
✓ Location
✓ Injury information
✓ Police report information
✓ Incident description
✓ Vehicle make and model
✓ Registration number
✓ Damage type
✓ Damage severity
✓ Damage description

If something is incorrect, use the Edit option.

If everything is correct, submit the claim.`;
    }

    // =========================================
    // SUBMIT CLAIM
    // =========================================
    if (
      containsAny(lowerText, [
        "submit claim",
        "submit the claim",
        "how to submit",
        "claim submit",
        "submit kaise",
        "submit kese"
      ])
    ) {
      return `To submit your claim:

1. Complete the Incident Details.
2. Complete Vehicle & Damage details.
3. Continue to Review & Submit.
4. Carefully check all information.
5. Edit anything that is incorrect.
6. When everything is correct, submit the claim.

After submission, you can use My Claims to view and track your submitted claim.`;
    }

    // =========================================
    // FILE / CREATE CLAIM
    // =========================================
    if (
      containsAny(lowerText, [
        "file a claim",
        "file claim",
        "create claim",
        "start claim",
        "new claim",
        "claim kaise",
        "claim kese",
        "claim banana",
        "claim banau"
      ])
    ) {
      return `To file a new insurance claim:

1. Open New Claim.
2. Complete Incident Details.
3. Click Continue.
4. Complete Vehicle & Damage details.
5. Click Continue.
6. Review all information.
7. Submit the claim.

You can also save your progress as a draft if you are not ready to submit it yet.

If you want, ask me "Explain Incident Details" and I can guide you through every field.`;
    }

    // =========================================
    // DOCUMENTS
    // =========================================
    if (
      containsAny(lowerText, [
        "document",
        "documents",
        "required documents",
        "what documents",
        "which documents",
        "documents needed",
        "papers",
        "proof"
      ])
    ) {
      return `Common documents that may be required for an insurance claim include:

📄 Insurance policy details
🚗 Vehicle registration
🪪 Driving licence
📷 Photographs of vehicle damage
📝 Accident/incident details
👮 Police report or FIR, if applicable

The exact documents can depend on the type of claim.

If you tell me what happened, I can explain which documents are likely relevant to that situation.`;
    }

    // =========================================
    // TRACKING
    // =========================================
    if (
      containsAny(lowerText, [
        "track",
        "tracking",
        "claim status",
        "status",
        "where is my claim",
        "claim progress",
        "progress"
      ])
    ) {
      return `You can track a submitted claim from the My Claims section.

Steps:

1. Open My Claims from the sidebar.
2. Find the claim you want to check.
3. Open the claim details.
4. Click Track Claim.
5. View the current status and progress.

If you haven't submitted the claim yet, it may still be saved as a draft instead of appearing as a submitted claim.`;
    }

    // =========================================
    // DRAFT
    // =========================================
    if (
      containsAny(lowerText, [
        "draft",
        "save draft",
        "saved draft",
        "draft kaise",
        "draft save"
      ])
    ) {
      return `If you are not ready to submit your claim, you can save it as a draft.

You can use:

💾 Save Complete Claim Draft

Later, open Drafts from the sidebar to restore your saved information and continue filling the form.

Tip: Save a draft before leaving if you have entered important claim information but are not ready to submit it.`;
    }

    // =========================================
    // CLAIM PROCESS
    // =========================================
    if (
      containsAny(lowerText, [
        "claim process",
        "process",
        "claim procedure",
        "procedure",
        "what happens",
        "how does claim work"
      ])
    ) {
      return `The Forma AI claim process has three main stages:

1️⃣ Incident Details
Describe what happened, when and where it happened, injury information, police report information, and incident description.

2️⃣ Vehicle & Damage
Enter vehicle information and describe the damage.

3️⃣ Review & Submit
Check everything carefully and submit the claim.

After submission, use My Claims and Claim Tracking to monitor your claim.

If you want detailed help, ask:
"Explain Incident Details"
or
"Explain Vehicle Damage".`;
    }

    // =========================================
    // EXAMPLE REQUEST
    // =========================================
    if (
      containsAny(lowerText, [
        "example",
        "example do",
        "example dedo",
        "sample",
        "sample do",
        "sample description"
      ])
    ) {
      return `Sure! Here's a sample vehicle accident claim:

Incident:
"On 20 August 2026 at approximately 5:30 PM, my vehicle was involved in an accident near Vijay Nagar, Indore. Another vehicle collided with the front-left side of my car while changing lanes. No person was injured."

Vehicle:
Make: Hyundai
Model: Creta
Registration: MP09AB1234

Damage:
Type: Front Bumper
Severity: Moderate
Description:
"The front bumper has a large crack on the left side and is partially detached. There are scratches around the bumper area."

Use this only as an example. Enter your actual information in the form.`;
    }

    // =========================================
    // GREETING
    // =========================================
    if (
      containsAny(lowerText, [
        "hi",
        "hello",
        "hey",
        "hii",
        "help"
      ]) &&
      lowerText.length < 35
    ) {
      return `Hi! 👋 I'm here to help you with your insurance claim.

You can ask me things like:

• "How do I fill the form?"
• "Explain the steps"
• "What should I write in description?"
• "What should I select for police report?"
• "How do I describe vehicle damage?"
• "What documents do I need?"
• "How do I submit my claim?"
• "How can I track my claim?"

Ask me in your normal words — you don't need to use a specific command.`;
    }

    // =========================================
    // GENERAL INSURANCE QUESTION
    // =========================================
    if (
      containsAny(lowerText, [
        "insurance",
        "policy",
        "claim help",
        "claim guidance",
        "insurance help"
      ])
    ) {
      return `I can help you with your insurance claim and the Forma AI form.

I can guide you through:

📋 Incident Details
🚗 Vehicle & Damage
📝 Description writing
👮 Police report information
📄 Required documents
🔎 Review & Submit
📊 Claim Tracking
💾 Drafts

For example, ask:
"Tell me how to fill Incident Details step by step."`;
    }

    // =========================================
    // FALLBACK
    // =========================================
    return `I can help you with your insurance claim, including filling the form step by step.

Try asking me something like:

• "How do I fill the form step by step?"
• "What should I write in the incident description?"
• "What should I select for police report?"
• "How do I fill vehicle details?"
• "How should I describe the damage?"
• "How do I choose damage severity?"
• "What documents do I need?"
• "How do I submit my claim?"
• "How can I track my claim?"

You can ask in simple English or Hinglish — I'll try to guide you based on the claim form.`;
  };

  // =========================
  // SEND MESSAGE
  // =========================
  const handleSend = () => {
    const text = message.trim();

    if (!text) return;

    setMessages((previous) => [
      ...previous,
      {
        sender: "user",
        text
      },
      {
        sender: "ai",
        text: getAIResponse(text)
      }
    ]);

    setMessage("");
  };

  // =========================
  // QUICK SUGGESTION
  // =========================
  const handleSuggestion = (suggestion) => {
    setMessage(suggestion);
  };

  // =========================
  // HELP ITEM CLICK
  // =========================
  const handleHelpClick = (type) => {
    setSelectedHelp(type);
  };

  // =========================
  // HELP CONTENT
  // =========================
  const getHelpContent = () => {
    if (selectedHelp === "guidance") {
      return {
        title: "📋 Claim Guidance",
        text: "Follow these steps to complete your insurance claim smoothly.",
        points: [
          "Describe the incident clearly.",
          "Enter the date, time, and location of the incident.",
          "Provide injury and police report information if applicable.",
          "Provide vehicle and damage information.",
          "Review all entered information carefully.",
          "Submit the claim after confirming the details."
        ]
      };
    }

    if (selectedHelp === "documents") {
      return {
        title: "📄 Required Documents",
        text: "The following documents may be required depending on your claim.",
        points: [
          "Insurance policy details",
          "Vehicle registration",
          "Driving licence",
          "Accident or incident details",
          "Photographs of vehicle damage",
          "Police report, if applicable"
        ]
      };
    }

    if (selectedHelp === "damage") {
      return {
        title: "🚗 Vehicle Damage Guidance",
        text: "Provide clear and accurate information about the vehicle damage.",
        points: [
          "Mention the damaged vehicle area.",
          "Describe dents, scratches, cracks, or broken parts.",
          "Select the appropriate damage type.",
          "Choose the damage severity.",
          "Add a detailed description of the damage."
        ]
      };
    }

    if (selectedHelp === "status") {
      return {
        title: "📊 Claim Status",
        text: "You can understand your claim progress through the My Claims section.",
        points: [
          "Open My Claims from the sidebar.",
          "Select the claim you want to check.",
          "View the current claim status.",
          "Check the progress of your claim.",
          "Follow any additional instructions provided."
        ]
      };
    }

    return null;
  };

  const helpContent = getHelpContent();

  return (
    <div className="ai-assistant-page">

      {/* ================= HEADER ================= */}

      <div className="ai-assistant-header">

        <div>
          <h2>✨ AI Assistant</h2>

          <p>
            Get instant help with your insurance claim
          </p>
        </div>

        <div className="ai-status">
          <span className="status-dot"></span>
          AI Online
        </div>

      </div>


      {/* ================= CONTENT ================= */}

      <div className="ai-assistant-content">

        {/* ================= CHAT ================= */}

        <div className="ai-chat-card">

          <div className="chat-header">

            <div className="chat-avatar">
              ✨
            </div>

            <div>
              <strong>
                Forma AI Assistant
              </strong>

              <span>
                Smart Claims Support
              </span>
            </div>

          </div>


          {/* CHAT MESSAGES */}

          <div className="chat-messages">

            {messages.map((item, index) => (

              <div
                key={index}
                className={
                  item.sender === "user"
                    ? "chat-message user-message"
                    : "chat-message ai-message"
                }
              >

                {item.sender === "ai" && (
                  <div className="message-avatar">
                    ✨
                  </div>
                )}

                <div className="message-bubble">
                  {item.text}
                </div>

              </div>

            ))}

          </div>


          {/* QUICK QUESTIONS */}

          <div className="suggestions">

            <span>
              Quick questions
            </span>

            <div className="suggestion-list">

              {suggestions.map(
                (suggestion, index) => (

                  <button
                    type="button"
                    key={index}
                    onClick={() =>
                      handleSuggestion(
                        suggestion
                      )
                    }
                  >
                    {suggestion}
                  </button>

                )
              )}

            </div>

          </div>


          {/* INPUT */}

          <div className="chat-input-area">

            <input
              type="text"
              placeholder="Ask me anything about your claim..."
              value={message}
              onChange={(event) =>
                setMessage(event.target.value)
              }
              onKeyDown={(event) => {

                if (event.key === "Enter") {
                  handleSend();
                }

              }}
            />

            <button
              type="button"
              onClick={handleSend}
            >
              Send →
            </button>

          </div>

        </div>


        {/* ================= HELP CARD ================= */}

        <div className="ai-help-card">

          <div className="help-icon">
            💡
          </div>

          <h3>
            What can I help with?
          </h3>


          {/* CLAIM GUIDANCE */}

          <div
            className={
              selectedHelp === "guidance"
                ? "help-item active-help-item"
                : "help-item"
            }
            onClick={() =>
              handleHelpClick("guidance")
            }
          >

            <span>
              📋
            </span>

            <div>
              <strong>
                Claim Guidance
              </strong>

              <p>
                Understand each step of your claim.
              </p>
            </div>

          </div>


          {/* DOCUMENTS */}

          <div
            className={
              selectedHelp === "documents"
                ? "help-item active-help-item"
                : "help-item"
            }
            onClick={() =>
              handleHelpClick("documents")
            }
          >

            <span>
              📄
            </span>

            <div>
              <strong>
                Documents
              </strong>

              <p>
                Learn which documents may be required.
              </p>
            </div>

          </div>


          {/* VEHICLE DAMAGE */}

          <div
            className={
              selectedHelp === "damage"
                ? "help-item active-help-item"
                : "help-item"
            }
            onClick={() =>
              handleHelpClick("damage")
            }
          >

            <span>
              🚗
            </span>

            <div>
              <strong>
                Vehicle Damage
              </strong>

              <p>
                Get help describing vehicle damage.
              </p>
            </div>

          </div>


          {/* CLAIM STATUS */}

          <div
            className={
              selectedHelp === "status"
                ? "help-item active-help-item"
                : "help-item"
            }
            onClick={() =>
              handleHelpClick("status")
            }
          >

            <span>
              📊
            </span>

            <div>
              <strong>
                Claim Status
              </strong>

              <p>
                Understand your claim progress.
              </p>
            </div>

          </div>


          {/* ================= DETAIL PANEL ================= */}

          {helpContent && (

            <div className="help-detail-panel">

              <div className="help-detail-header">

                <h3>
                  {helpContent.title}
                </h3>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedHelp(null)
                  }
                >
                  ✕
                </button>

              </div>

              <p>
                {helpContent.text}
              </p>

              <ul>

                {helpContent.points.map(
                  (point, index) => (

                    <li key={index}>
                      {point}
                    </li>

                  )
                )}

              </ul>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default AIAssistant;