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
  // AI RESPONSE
  // =========================
  const getAIResponse = (text) => {
    const lowerText = text.toLowerCase();

    if (
      lowerText.includes("file") ||
      lowerText.includes("claim")
    ) {
      return "To file an insurance claim, start a New Claim and provide your incident, vehicle, damage, and review details. Make sure the information is accurate before submitting.";
    }

    if (
      lowerText.includes("document") ||
      lowerText.includes("documents")
    ) {
      return "Common claim documents may include your vehicle registration, driving licence, insurance policy details, accident information, photographs of the damage, and a police report if applicable.";
    }

    if (
      lowerText.includes("track") ||
      lowerText.includes("tracking") ||
      lowerText.includes("status")
    ) {
      return "You can track your submitted claims from the My Claims section. Select a claim to view its current status and progress.";
    }

    if (
      lowerText.includes("damage") ||
      lowerText.includes("vehicle")
    ) {
      return "When describing vehicle damage, mention the damaged area, type of damage, severity, and any visible scratches, dents, cracks, or broken parts.";
    }

    if (
      lowerText.includes("process") ||
      lowerText.includes("how")
    ) {
      return "The claim process generally includes describing the incident, entering vehicle and damage details, reviewing the information, and submitting the claim.";
    }

    return "I can help you understand the claim process, required documents, vehicle damage details, claim tracking, and other Forma AI features.";
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