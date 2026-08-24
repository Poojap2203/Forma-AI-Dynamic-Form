import { useEffect, useState } from "react";

function ClaimTracking({
  claim,
  onBack
}) {

  const [activities, setActivities] =
    useState([]);

  const [currentClaim, setCurrentClaim] =
    useState(claim);


  /* =========================
     STATUS STEPS
     ========================= */

  const statusSteps = [

    {
      key: "Submitted",
      title: "Claim Submitted",
      description:
        "Your insurance claim has been successfully submitted."
    },

    {
      key: "Under Review",
      title: "Under Review",
      description:
        "Your claim is currently being reviewed."
    },

    {
      key: "Assessment",
      title: "Assessment",
      description:
        "The claim details and damage are being assessed."
    },

    {
      key: "Completed",
      title: "Claim Completed",
      description:
        "Your claim process has been completed."
    }

  ];


  /* =========================
     LOAD CLAIM
     ========================= */

  useEffect(() => {

    setCurrentClaim(claim);

  }, [claim]);


  /* =========================
     LOAD ACTIVITY
     ========================= */

  useEffect(() => {

    if (!currentClaim?.claimId) {

      setActivities([]);

      return;
    }


    try {

      const savedActivities =
        JSON.parse(
          localStorage.getItem(
            "formaAI_claim_activity"
          ) || "[]"
        );


      const claimActivities =
        Array.isArray(savedActivities)
          ? savedActivities.filter(
              (activity) =>
                activity.claimId ===
                currentClaim.claimId
            )
          : [];


      setActivities(
        claimActivities
      );

    } catch (error) {

      console.error(
        "Unable to load claim activity:",
        error
      );

      setActivities([]);

    }

  }, [currentClaim]);


  /* =========================
     GET STATUS INDEX
     ========================= */

  const getStatusIndex = () => {

    const index =
      statusSteps.findIndex(
        (step) =>
          step.key ===
          currentClaim?.status
      );


    return index === -1
      ? 0
      : index;

  };


  const activeIndex =
    getStatusIndex();


  /* =========================
     DAY 18 PROGRESS
     ========================= */

  const progressPercentage =
    Math.round(
      ((activeIndex + 1) /
        statusSteps.length) *
        100
    );


  const currentStage =
    statusSteps[activeIndex];


  const nextStage =
    statusSteps[activeIndex + 1] ||
    null;


  /* =========================
     UPDATE CLAIM STATUS
     ========================= */

  const updateClaimStatus = (
    newStatus
  ) => {

    if (
      !currentClaim?.claimId
    ) {

      return;

    }


    const submissionTime =
      new Date().toLocaleString();


    /* =========================
       UPDATED CLAIM
       ========================= */

    const updatedClaim = {

      ...currentClaim,

      status:
        newStatus,

      updatedAt:
        submissionTime

    };


    setCurrentClaim(
      updatedClaim
    );


    /* =========================
       UPDATE CURRENT CLAIM
       ========================= */

    localStorage.setItem(

      "formaAI_claim",

      JSON.stringify(
        updatedClaim
      )

    );


    /* =========================
       UPDATE CLAIM HISTORY
       ========================= */

    try {

      const existingClaims =
        JSON.parse(
          localStorage.getItem(
            "formaAI_claims"
          ) || "[]"
        );


      const updatedClaims =
        existingClaims.map(
          (item) =>
            item.claimId ===
            updatedClaim.claimId
              ? updatedClaim
              : item
        );


      localStorage.setItem(

        "formaAI_claims",

        JSON.stringify(
          updatedClaims
        )

      );

    } catch (error) {

      console.error(
        "Unable to update claim history:",
        error
      );

    }


    /* =========================
       CLAIM ACTIVITY
       ========================= */

    const activity = {

      id:
        Date.now(),

      claimId:
        updatedClaim.claimId,

      type:
        newStatus
          .toLowerCase()
          .replace(
            /\s+/g,
            "_"
          ),

      title:
        `Claim ${newStatus}`,

      description:
        getStatusDescription(
          newStatus
        ),

      time:
        submissionTime

    };


    try {

      const existingActivities =
        JSON.parse(
          localStorage.getItem(
            "formaAI_claim_activity"
          ) || "[]"
        );


      const updatedActivities = [

        ...existingActivities,

        activity

      ];


      localStorage.setItem(

        "formaAI_claim_activity",

        JSON.stringify(
          updatedActivities
        )

      );


      setActivities(

        updatedActivities.filter(
          (item) =>
            item.claimId ===
            updatedClaim.claimId
        )

      );

    } catch (error) {

      console.error(
        "Unable to save activity:",
        error
      );

    }


    /* =========================
       NOTIFICATION
       ========================= */

    const notification = {

      id:
        Date.now() + 1,

      claimId:
        updatedClaim.claimId,

      title:
        `Claim ${newStatus}`,

      message:
        `Your claim ${updatedClaim.claimId} is now ${newStatus}.`,

      time:
        submissionTime,

      read:
        false

    };


    try {

      const existingNotifications =
        JSON.parse(
          localStorage.getItem(
            "formaAI_notifications"
          ) || "[]"
        );


      localStorage.setItem(

        "formaAI_notifications",

        JSON.stringify([

          ...existingNotifications,

          notification

        ])

      );

    } catch (error) {

      console.error(
        "Unable to save notification:",
        error
      );

    }

  };


  /* =========================
     STATUS DESCRIPTION
     ========================= */

  function getStatusDescription(
    status
  ) {

    if (
      status === "Submitted"
    ) {

      return (
        "Your insurance claim has been successfully submitted."
      );

    }


    if (
      status === "Under Review"
    ) {

      return (
        "Your claim is currently being reviewed by the claims team."
      );

    }


    if (
      status === "Assessment"
    ) {

      return (
        "Your claim details and vehicle damage are being assessed."
      );

    }


    if (
      status === "Completed"
    ) {

      return (
        "Your claim process has been completed successfully."
      );

    }


    return (
      "Your claim status has been updated."
    );

  }


  /* =========================
     NO CLAIM
     ========================= */

  if (!currentClaim) {

    return (

      <div className="tracking-container">

        <div className="tracking-empty">

          <div className="tracking-empty-icon">
            📍
          </div>

          <h2>
            No Claim Selected
          </h2>

          <p>
            Please select a claim from My Claims
            to view its tracking information.
          </p>

          <button
            type="button"
            className="continue"
            onClick={
              onBack
            }
          >
            ← Back to My Claims
          </button>

        </div>

      </div>

    );

  }


  return (

    <div className="tracking-container">


      {/* =========================
          HEADER
          ========================= */}

      <div className="tracking-header">

        <div>

          <h2>
            Claim Tracking
          </h2>

          <p>
            Track the progress of your insurance claim.
          </p>

        </div>


        <button
          type="button"
          className="secondary-button"
          onClick={
            onBack
          }
        >
          ← Back to My Claims
        </button>

      </div>


      {/* =========================
          CLAIM SUMMARY
          ========================= */}

      <div className="tracking-summary">

        <div className="tracking-claim-info">

          <span>
            Claim ID
          </span>

          <strong>
            {currentClaim.claimId}
          </strong>

        </div>


        <div className="tracking-claim-info">

          <span>
            Current Status
          </span>

          <strong className="tracking-status">
            ● {currentClaim.status}
          </strong>

        </div>


        <div className="tracking-claim-info">

          <span>
            Submitted
          </span>

          <strong>
            {
              currentClaim.submittedAt ||
              "Not available"
            }
          </strong>

        </div>

      </div>


      {/* =========================
          DAY 18 PROGRESS OVERVIEW
          ========================= */}

      <div className="tracking-card day18-progress-card">

        <div className="tracking-card-header">

          <div>

            <h3>
              Claim Progress Overview
            </h3>

            <p>
              Your claim is currently at{" "}
              <strong>
                {progressPercentage}%
              </strong>{" "}
              completion.
            </p>

          </div>


          <div className="progress-percentage">
            {progressPercentage}%
          </div>

        </div>


        {/* PROGRESS BAR */}

        <div className="progress-bar-container">

          <div
            className="progress-bar-fill"
            style={{
              width:
                `${progressPercentage}%`
            }}
          />

        </div>


        {/* CURRENT + NEXT STAGE */}

        <div className="stage-overview">

          <div className="stage-overview-item">

            <span>
              Current Stage
            </span>

            <strong>
              {
                currentStage?.title
              }
            </strong>

          </div>


          <div className="stage-overview-item">

            <span>
              Next Stage
            </span>

            <strong>

              {
                nextStage
                  ? nextStage.title
                  : "Process Completed"
              }

            </strong>

          </div>

        </div>


        {/* STATUS MESSAGE */}

        <div className="tracking-status-message">

          <div className="status-message-icon">

            {
              nextStage
                ? "⏳"
                : "✓"
            }

          </div>


          <div>

            <strong>

              {
                nextStage
                  ? `Currently: ${currentStage?.title}`
                  : "Claim Process Completed"
              }

            </strong>


            <p>

              {
                nextStage
                  ? `Next: ${nextStage.title}. Your claim will move to the next stage after the current review is completed.`
                  : "All claim processing stages have been completed successfully."
              }

            </p>

          </div>

        </div>

      </div>


      {/* =========================
          CLAIM PROGRESS
          ========================= */}

      <div className="tracking-card">

        <div className="tracking-card-header">

          <h3>
            Claim Progress
          </h3>

          <p>
            Follow your claim through each stage.
          </p>

        </div>


        <div className="tracking-timeline">

          {statusSteps.map(
            (step, index) => {

              const completed =
                index <=
                activeIndex;

              const active =
                index ===
                activeIndex;


              return (

                <div
                  className={
                    completed
                      ? "tracking-step completed"
                      : "tracking-step"
                  }

                  key={
                    step.key
                  }
                >

                  {index <
                    statusSteps.length - 1 && (

                    <div
                      className={
                        index <
                        activeIndex
                          ? "tracking-line active"
                          : "tracking-line"
                      }
                    />

                  )}


                  <div
                    className={
                      active
                        ? "tracking-circle active"
                        : completed
                        ? "tracking-circle completed"
                        : "tracking-circle"
                    }
                  >

                    {
                      completed
                        ? "✓"
                        : index + 1
                    }

                  </div>


                  <div className="tracking-step-content">

                    <div className="tracking-step-title">

                      <strong>
                        {step.title}
                      </strong>


                      {active && (

                        <span className="tracking-current">
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

            }

          )}

        </div>

      </div>


      {/* =========================
          DAY 16 STATUS UPDATE
          ========================= */}

      <div className="tracking-card">

        <div className="tracking-card-header">

          <h3>
            Update Claim Status
          </h3>

          <p>
            Update the current stage of this claim.
          </p>

        </div>


        <div className="status-update-buttons">

          {statusSteps.map(
            (step) => (

              <button
                type="button"

                key={
                  step.key
                }

                className={
                  currentClaim.status ===
                  step.key
                    ? "status-update-button active"
                    : "status-update-button"
                }

                onClick={() =>
                  updateClaimStatus(
                    step.key
                  )
                }
              >

                {step.key}

              </button>

            )
          )}

        </div>

      </div>


      {/* =========================
          CLAIM ACTIVITY
          ========================= */}

      <div className="tracking-card">

        <div className="tracking-card-header">

          <h3>
            Claim Activity
          </h3>

          <p>
            Recent updates and actions related to this claim.
          </p>

        </div>


        {activities.length === 0 ? (

          <div className="activity-empty">

            <div className="activity-empty-icon">
              🕒
            </div>

            <p>
              No additional activity available yet.
            </p>

          </div>

        ) : (

          <div className="activity-list">

            {activities
              .slice()
              .reverse()
              .map(
                (activity) => (

                  <div
                    className="activity-item"
                    key={
                      activity.id
                    }
                  >

                    <div className="activity-icon">

                      {
                        activity.type ===
                        "submitted"
                          ? "✓"
                          : activity.type ===
                            "under_review"
                          ? "👁"
                          : activity.type ===
                            "assessment"
                          ? "🔍"
                          : "✓"
                      }

                    </div>


                    <div className="activity-content">

                      <div className="activity-title-row">

                        <strong>
                          {activity.title}
                        </strong>

                        <span>
                          {activity.time}
                        </span>

                      </div>


                      <p>
                        {activity.description}
                      </p>

                    </div>

                  </div>

                )
              )}

          </div>

        )}

      </div>


      {/* =========================
          CLAIM INFORMATION
          ========================= */}

      <div className="tracking-card">

        <div className="tracking-card-header">

          <h3>
            Claim Information
          </h3>

        </div>


        <div className="tracking-info-grid">


          <div className="tracking-info-item">

            <span>
              Incident Type
            </span>

            <strong>

              {
                currentClaim.incident
                  ?.incidentType ||
                "Not provided"
              }

            </strong>

          </div>


          <div className="tracking-info-item">

            <span>
              Incident Date
            </span>

            <strong>

              {
                currentClaim.incident
                  ?.date ||
                "Not provided"
              }

            </strong>

          </div>


          <div className="tracking-info-item">

            <span>
              Location
            </span>

            <strong>

              {
                currentClaim.incident
                  ?.location ||
                "Not provided"
              }

            </strong>

          </div>


          <div className="tracking-info-item">

            <span>
              Vehicle
            </span>

            <strong>

              {
                currentClaim.vehicle
                  ?.vehicleMake ||
                "Not provided"
              }

              {" "}

              {
                currentClaim.vehicle
                  ?.vehicleModel ||
                ""
              }

            </strong>

          </div>


          <div className="tracking-info-item">

            <span>
              Damage Type
            </span>

            <strong>

              {
                currentClaim.vehicle
                  ?.damageType ||
                "Not provided"
              }

            </strong>

          </div>


          <div className="tracking-info-item">

            <span>
              Severity
            </span>

            <strong>

              {
                currentClaim.vehicle
                  ?.severity ||
                "Not provided"
              }

            </strong>

          </div>


        </div>

      </div>


      {/* =========================
          DESCRIPTION
          ========================= */}

      <div className="tracking-card">

        <div className="tracking-card-header">

          <h3>
            Incident Description
          </h3>

        </div>


        <div className="tracking-description">

          {
            currentClaim.incident
              ?.description ||
            "No description provided."
          }

        </div>

      </div>


      {/* =========================
          FOOTER
          ========================= */}

      <div className="tracking-footer">

        <button
          type="button"
          className="secondary-button"
          onClick={
            onBack
          }
        >
          ← Back to My Claims
        </button>

      </div>


    </div>

  );

}


export default ClaimTracking;