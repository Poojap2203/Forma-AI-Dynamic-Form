import React from "react";

function ClaimTracking({ claim, onBack }) {
  if (!claim) {
    return (
      <div className="tracking-card">
        <div className="tracking-empty">
          <div className="tracking-empty-icon">📄</div>

          <h2>No Claim Selected</h2>

          <p>
            Select a claim from My Claims to track its progress.
          </p>

          <button
            type="button"
            className="tracking-back-button"
            onClick={onBack}
          >
            ← Back to My Claims
          </button>
        </div>
      </div>
    );
  }

  const status = claim.status || "Submitted";

  const statusSteps = [
    {
      title: "Claim Submitted",
      description:
        "Your claim has been successfully submitted.",
      icon: "✓"
    },
    {
      title: "Documents Verified",
      description:
        "Your claim information and documents are being verified.",
      icon: "📋"
    },
    {
      title: "Under Review",
      description:
        "Our claims team is reviewing your claim.",
      icon: "🔍"
    },
    {
      title: "Assessment",
      description:
        "The claim is being assessed for approval.",
      icon: "⚙"
    },
    {
      title: "Final Decision",
      description:
        "You will be notified once the final decision is made.",
      icon: "✓"
    }
  ];

  const getCurrentStep = () => {
    if (status === "Rejected") {
      return 4;
    }

    if (status === "Approved") {
      return 5;
    }

    if (status === "Under Review") {
      return 3;
    }

    if (status === "Assessment") {
      return 4;
    }

    return 1;
  };

  const currentStep = getCurrentStep();

  return (
    <div className="tracking-page">

      {/* BACK */}

      <button
        type="button"
        className="tracking-back"
        onClick={onBack}
      >
        ← Back to My Claims
      </button>


      {/* HEADER */}

      <div className="tracking-header">

        <div>

          <div className="tracking-title-row">

            <div className="tracking-icon">
              📍
            </div>

            <div>
              <h2>
                Track Your Claim
              </h2>

              <p>
                Monitor the progress of your insurance claim.
              </p>
            </div>

          </div>

        </div>


        <div className="tracking-status">
          ● {status}
        </div>

      </div>


      {/* CLAIM INFO */}

      <div className="tracking-info-card">

        <div className="tracking-info-item">

          <span>
            Claim ID
          </span>

          <strong>
            {claim.claimId}
          </strong>

        </div>


        <div className="tracking-info-item">

          <span>
            Submitted On
          </span>

          <strong>
            {claim.submittedAt || "Recently"}
          </strong>

        </div>


        <div className="tracking-info-item">

          <span>
            Current Status
          </span>

          <strong className="tracking-green">
            {status}
          </strong>

        </div>

      </div>


      {/* TIMELINE */}

      <div className="tracking-main-card">

        <h3>
          Claim Progress
        </h3>

        <p className="tracking-subtitle">
          Here's what's happening with your claim.
        </p>


        <div className="tracking-timeline">

          {statusSteps.map((step, index) => {

            const stepNumber = index + 1;

            const completed =
              stepNumber <= currentStep;

            const active =
              stepNumber === currentStep;

            return (
              <div
                className={
                  completed
                    ? "tracking-step completed"
                    : "tracking-step"
                }
                key={step.title}
              >

                <div className="timeline-left">

                  <div
                    className={
                      active
                        ? "timeline-circle active"
                        : completed
                        ? "timeline-circle completed"
                        : "timeline-circle"
                    }
                  >
                    {completed
                      ? "✓"
                      : step.icon}
                  </div>

                  {index <
                    statusSteps.length - 1 && (
                    <div
                      className={
                        stepNumber < currentStep
                          ? "timeline-line completed"
                          : "timeline-line"
                      }
                    />
                  )}

                </div>


                <div className="timeline-content">

                  <div className="timeline-title-row">

                    <h4>
                      {step.title}
                    </h4>

                    {active && (
                      <span className="current-badge">
                        Current
                      </span>
                    )}

                  </div>

                  <p>
                    {step.description}
                  </p>

                </div>

              </div>
            );
          })}

        </div>

      </div>


      {/* NEXT STEP */}

      <div className="next-step-card">

        <div className="next-step-icon">
          ✨
        </div>

        <div>

          <h3>
            What happens next?
          </h3>

          <p>
            Our team will continue reviewing your claim.
            You can return here anytime to check the latest
            status.
          </p>

        </div>

      </div>


      {/* ESTIMATE */}

      <div className="processing-card">

        <div className="processing-icon">
          ⏱
        </div>

        <div>

          <strong>
            Estimated Processing Time
          </strong>

          <span>
            Your claim may take 3–5 business days to process.
          </span>

        </div>

      </div>

    </div>
  );
}

export default ClaimTracking;