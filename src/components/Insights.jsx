import { useState } from "react";

function Insights() {
  const [selectedInsight, setSelectedInsight] = useState(null);

  // =========================
  // INSIGHT DATA
  // =========================

  const insights = [
    {
      id: "overview",
      icon: "📊",
      title: "Claim Overview",
      value: "12",
      label: "Total Claims",
      description:
        "View a quick summary of all your insurance claims.",
      details: [
        "12 total claims created",
        "5 claims currently in progress",
        "4 claims successfully resolved",
        "2 claims awaiting documents",
        "1 claim recently submitted"
      ]
    },

    {
      id: "pending",
      icon: "⏳",
      title: "Pending Claims",
      value: "5",
      label: "In Progress",
      description:
        "Claims that are currently being processed.",
      details: [
        "5 claims are currently pending",
        "Some claims may require additional information",
        "Check My Claims for the latest status",
        "Keep required documents ready"
      ]
    },

    {
      id: "approved",
      icon: "✓",
      title: "Resolved Claims",
      value: "4",
      label: "Completed",
      description:
        "Claims that have completed the processing journey.",
      details: [
        "4 claims have been resolved",
        "These claims no longer require action",
        "You can review their information from My Claims",
        "Keep the final claim records for reference"
      ]
    },

    {
      id: "documents",
      icon: "📄",
      title: "Document Insights",
      value: "2",
      label: "Need Attention",
      description:
        "Claims where additional documents may be required.",
      details: [
        "2 claims may require additional documents",
        "Check your claim details carefully",
        "Upload clear and readable documents",
        "Make sure the submitted information matches your claim"
      ]
    }
  ];

  // =========================
  // DAMAGE INSIGHTS
  // =========================

  const damageInsights = [
    {
      icon: "🚗",
      title: "Vehicle Damage",
      text:
        "Most reported claims involve vehicle exterior damage such as dents, scratches and broken parts."
    },

    {
      icon: "🔧",
      title: "Damage Severity",
      text:
        "Review the severity selected for each claim to understand the level of reported vehicle damage."
    },

    {
      icon: "📸",
      title: "Damage Evidence",
      text:
        "Clear photographs and detailed descriptions can help provide better information about vehicle damage."
    }
  ];

  // =========================
  // SELECT INSIGHT
  // =========================

  const handleInsightClick = (insight) => {
    setSelectedInsight(insight);
  };

  // =========================
  // CLOSE INSIGHT
  // =========================

  const closeInsight = () => {
    setSelectedInsight(null);
  };

  return (
    <div className="insights-page">

      {/* =========================
          HEADER
          ========================= */}

      <div className="insights-header">

        <div>
          <h2>📊 Insights</h2>

          <p>
            Understand your insurance claim activity
          </p>
        </div>

        <div className="insights-status">
          <span className="status-dot"></span>
          Updated
        </div>

      </div>


      {/* =========================
          SUMMARY CARDS
          ========================= */}

      <div className="insights-grid">

        {insights.map((insight) => (

          <div
            key={insight.id}
            className={
              selectedInsight?.id === insight.id
                ? "insight-card active-insight"
                : "insight-card"
            }
            onClick={() =>
              handleInsightClick(insight)
            }
          >

            <div className="insight-card-top">

              <div className="insight-icon">
                {insight.icon}
              </div>

              <span className="insight-arrow">
                →
              </span>

            </div>

            <h3>
              {insight.title}
            </h3>

            <div className="insight-value">
              {insight.value}
            </div>

            <span className="insight-label">
              {insight.label}
            </span>

            <p>
              {insight.description}
            </p>

          </div>

        ))}

      </div>


      {/* =========================
          SELECTED INSIGHT DETAILS
          ========================= */}

      {selectedInsight && (

        <div className="insight-detail-card">

          <div className="insight-detail-header">

            <div>

              <h3>
                {selectedInsight.icon}{" "}
                {selectedInsight.title}
              </h3>

              <p>
                {selectedInsight.description}
              </p>

            </div>

            <button
              type="button"
              onClick={closeInsight}
            >
              ✕
            </button>

          </div>

          <div className="insight-detail-content">

            <h4>
              Detailed Information
            </h4>

            <ul>

              {selectedInsight.details.map(
                (detail, index) => (

                  <li key={index}>
                    {detail}
                  </li>

                )
              )}

            </ul>

          </div>

        </div>

      )}


      {/* =========================
          CLAIM ACTIVITY
          ========================= */}

      <div className="insights-section">

        <div className="section-heading">

          <div>

            <h3>
              📈 Claim Activity
            </h3>

            <p>
              Overview of your recent claim activity
            </p>

          </div>

        </div>


        <div className="activity-card">

          <div className="activity-row">

            <div className="activity-icon">
              📝
            </div>

            <div className="activity-info">

              <strong>
                Claims Submitted
              </strong>

              <span>
                Recent claims added to the system
              </span>

            </div>

            <strong className="activity-number">
              12
            </strong>

          </div>


          <div className="activity-row">

            <div className="activity-icon">
              ⏳
            </div>

            <div className="activity-info">

              <strong>
                Claims In Progress
              </strong>

              <span>
                Claims currently under processing
              </span>

            </div>

            <strong className="activity-number">
              5
            </strong>

          </div>


          <div className="activity-row">

            <div className="activity-icon">
              ✓
            </div>

            <div className="activity-info">

              <strong>
                Claims Resolved
              </strong>

              <span>
                Successfully completed claims
              </span>

            </div>

            <strong className="activity-number">
              4
            </strong>

          </div>

        </div>

      </div>


      {/* =========================
          VEHICLE DAMAGE INSIGHTS
          ========================= */}

      <div className="insights-section">

        <div className="section-heading">

          <div>

            <h3>
              🚗 Vehicle Damage Insights
            </h3>

            <p>
              Helpful information for describing vehicle damage
            </p>

          </div>

        </div>


        <div className="damage-insights-grid">

          {damageInsights.map(
            (item, index) => (

              <div
                className="damage-insight-card"
                key={index}
                onClick={() =>
                  setSelectedInsight({
                    id: `damage-${index}`,
                    icon: item.icon,
                    title: item.title,
                    value: "",
                    label: "",
                    description: item.text,
                    details: [
                      item.text,
                      "Provide accurate information in your claim.",
                      "Use clear descriptions and supporting evidence where applicable."
                    ]
                  })
                }
              >

                <div className="damage-insight-icon">
                  {item.icon}
                </div>

                <div>

                  <h4>
                    {item.title}
                  </h4>

                  <p>
                    {item.text}
                  </p>

                </div>

                <span>
                  →
                </span>

              </div>

            )
          )}

        </div>

      </div>


      {/* =========================
          AI RECOMMENDATION
          ========================= */}

      <div className="insights-ai-card">

        <div className="ai-insight-icon">
          ✨
        </div>

        <div>

          <h3>
            AI Recommendation
          </h3>

          <p>
            Keep your claim information, documents,
            and vehicle damage descriptions accurate
            and up to date for a smoother claim process.
          </p>

        </div>

      </div>

    </div>
  );
}

export default Insights;