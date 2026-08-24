import { useEffect, useState } from "react";

function MyClaims({ onCreateNewClaim, onRestoreDraft, onTrackClaim}) {

  const [claims, setClaims] = useState([]);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [selectedClaim, setSelectedClaim] =
    useState(null);

  /* =========================
     STATUS FILTER
     ========================= */

  const [statusFilter, setStatusFilter] =
    useState("All");


  /* =========================
     LOAD CLAIMS
     ========================= */

  const loadClaims = () => {

    try {

      const savedClaims =
        JSON.parse(
          localStorage.getItem(
            "formaAI_claims"
          ) || "[]"
        );


      setClaims(

        Array.isArray(savedClaims)

          ? savedClaims

          : []

      );

    } catch (error) {

      console.error(
        "Unable to load claims:",
        error
      );

      setClaims([]);

    }

  };


  useEffect(() => {

    loadClaims();

  }, []);


  /* =========================
     SEARCH + STATUS FILTER
     ========================= */

  const filteredClaims =

    claims.filter((claim) => {

      const search =
        searchTerm
          .toLowerCase()
          .trim();


      const matchesSearch =

        !search ||

        claim?.claimId
          ?.toLowerCase()
          .includes(search)

        ||

        claim?.incident
          ?.incidentType
          ?.toLowerCase()
          .includes(search)

        ||

        claim?.status
          ?.toLowerCase()
          .includes(search)

        ||

        claim?.vehicle
          ?.vehicleMake
          ?.toLowerCase()
          .includes(search)

        ||

        claim?.vehicle
          ?.vehicleModel
          ?.toLowerCase()
          .includes(search);


      const matchesStatus =

        statusFilter === "All" ||

        claim?.status ===
          statusFilter;


      return (

        matchesSearch &&

        matchesStatus

      );

    });


  /* =========================
     STATUS COUNT
     ========================= */

  const getStatusCount = (
    status
  ) => {

    if (status === "All") {

      return claims.length;

    }


    return claims.filter(
      (claim) =>
        claim?.status ===
        status
    ).length;

  };


  /* =========================
     VIEW DETAILS
     ========================= */

  const handleViewDetails = (
    claim
  ) => {

    setSelectedClaim(claim);

  };


  /* =========================
     CLOSE DETAILS
     ========================= */

  const handleCloseDetails = () => {

    setSelectedClaim(null);

  };


  /* =========================
     EMPTY STATE
     ========================= */

  if (claims.length === 0) {

    return (

      <div className="my-claims-container">


        <div className="my-claims-header">

          <div>

            <h2>
              My Claims
            </h2>

            <p>
              View and manage your submitted insurance claims.
            </p>

          </div>


          <button
            type="button"
            className="continue"
            onClick={
              onCreateNewClaim
            }
          >
            + New Claim
          </button>

        </div>


        <div className="claims-empty">

          <div className="claims-empty-icon">
            📄
          </div>


          <h3>
            No Claims Yet
          </h3>


          <p>
            You haven't submitted any insurance claims yet.
          </p>


          <button
            type="button"
            className="continue"
            onClick={
              onCreateNewClaim
            }
          >
            + Create Your First Claim
          </button>


          <button
            type="button"
            className="secondary-button claims-draft-button"
            onClick={
              onRestoreDraft
            }
          >
            📋 Restore Draft
          </button>

        </div>

      </div>

    );

  }


  /* =========================
     CLAIM DETAILS
     ========================= */

  if (selectedClaim) {

    return (

      <div className="my-claims-container">


        <div className="my-claims-header">

          <div>

            <h2>
              Claim Details
            </h2>

            <p>
              Complete information about your claim.
            </p>

          </div>


          <button
            type="button"
            className="secondary-button"
            onClick={
              handleCloseDetails
            }
          >
            ← Back to My Claims
          </button>

        </div>


        <div className="claim-details-card">


          {/* CLAIM HEADER */}

          <div className="claim-details-top">

            <div>

              <span className="claim-label">
                Claim ID
              </span>

              <h2>
                {selectedClaim.claimId}
              </h2>

            </div>


            <span
              className={
                selectedClaim.status ===
                "Completed"

                  ? "claim-status completed"

                  : selectedClaim.status ===
                    "Assessment"

                  ? "claim-status assessment"

                  : selectedClaim.status ===
                    "Under Review"

                  ? "claim-status review"

                  : "claim-status submitted"
              }
            >
              ●{" "}
              {
                selectedClaim.status ||
                "Submitted"
              }
            </span>

          </div>


          {/* BASIC INFORMATION */}

          <div className="claim-details-section">

            <h3>
              Claim Information
            </h3>


            <div className="claim-details-grid">


              <DetailItem
                label="Claim ID"
                value={
                  selectedClaim.claimId
                }
              />


              <DetailItem
                label="Status"
                value={
                  selectedClaim.status
                }
              />


              <DetailItem
                label="Submitted At"
                value={
                  selectedClaim.submittedAt
                }
              />


              <DetailItem
                label="Incident Type"
                value={
                  selectedClaim
                    .incident
                    ?.incidentType
                }
              />


              <DetailItem
                label="Incident Date"
                value={
                  selectedClaim
                    .incident
                    ?.date
                }
              />


              <DetailItem
                label="Location"
                value={
                  selectedClaim
                    .incident
                    ?.location
                }
              />

            </div>

          </div>


          {/* VEHICLE INFORMATION */}

          <div className="claim-details-section">

            <h3>
              Vehicle & Damage
            </h3>


            <div className="claim-details-grid">


              <DetailItem
                label="Vehicle Make"
                value={
                  selectedClaim
                    .vehicle
                    ?.vehicleMake
                }
              />


              <DetailItem
                label="Vehicle Model"
                value={
                  selectedClaim
                    .vehicle
                    ?.vehicleModel
                }
              />


              <DetailItem
                label="Registration"
                value={
                  selectedClaim
                    .vehicle
                    ?.registration
                }
              />


              <DetailItem
                label="Damage Type"
                value={
                  selectedClaim
                    .vehicle
                    ?.damageType
                }
              />


              <DetailItem
                label="Severity"
                value={
                  selectedClaim
                    .vehicle
                    ?.severity
                }
              />

            </div>


            <div className="claim-description">

              <span>
                Damage Description
              </span>

              <p>

                {
                  selectedClaim
                    .vehicle
                    ?.damageDescription

                  ||

                  "Not provided"

                }

              </p>

            </div>

          </div>


          {/* INCIDENT DESCRIPTION */}

          <div className="claim-details-section">

            <h3>
              Incident Description
            </h3>


            <div className="claim-description">

              <p>

                {
                  selectedClaim
                    .incident
                    ?.description

                  ||

                  "Not provided"

                }

              </p>

            </div>

          </div>


          {/* ACTIONS */}

          <div className="claim-details-actions">


            <button
              type="button"
              className="secondary-button"
              onClick={
                handleCloseDetails
              }
            >
              ← Back
            </button>


            <button
              type="button"
              className="continue"
              onClick={() => {

                onTrackClaim(
                  selectedClaim
                );

              }}
            >
              📍 Track Claim
            </button>

          </div>


        </div>

      </div>

    );

  }


  /* =========================
     MAIN MY CLAIMS
     ========================= */

  return (

    <div className="my-claims-container">


      {/* HEADER */}

      <div className="my-claims-header">

        <div>

          <h2>
            My Claims
          </h2>

          <p>
            View and manage all your submitted claims.
          </p>

        </div>


        <button
          type="button"
          className="continue"
          onClick={
            onCreateNewClaim
          }
        >
          + New Claim
        </button>

      </div>


      {/* =========================
         SEARCH
         ========================= */}

      <div className="claims-toolbar">


        <div className="claims-search">

          <span>
            🔍
          </span>


          <input
            type="text"
            placeholder="Search by Claim ID, vehicle, incident type or status..."
            value={
              searchTerm
            }
            onChange={(event) =>
              setSearchTerm(
                event.target.value
              )
            }
          />


          {searchTerm && (

            <button
              type="button"
              className="clear-search-button"
              onClick={() =>
                setSearchTerm("")
              }
            >
              ×
            </button>

          )}

        </div>


        <div className="claims-count">

          {filteredClaims.length}{" "}

          {
            filteredClaims.length ===
            1

              ? "Claim"

              : "Claims"

          }

        </div>

      </div>


      {/* =========================
         DAY 17 STATUS FILTER
         ========================= */}

      <div className="claim-filter-area">


        <div className="claim-filter-title">

          <span>
            Filter by Status
          </span>


          {(searchTerm ||
            statusFilter !==
              "All") && (

            <button
              type="button"
              className="clear-filter-button"
              onClick={() => {

                setSearchTerm("");

                setStatusFilter(
                  "All"
                );

              }}
            >
              Clear Filters
            </button>

          )}

        </div>


        <div className="claim-filter-chips">


          <button
            type="button"
            className={
              statusFilter ===
              "All"

                ? "claim-filter-chip active"

                : "claim-filter-chip"
            }
            onClick={() =>
              setStatusFilter(
                "All"
              )
            }
          >
            All (
            {
              getStatusCount(
                "All"
              )
            }
            )
          </button>


          <button
            type="button"
            className={
              statusFilter ===
              "Submitted"

                ? "claim-filter-chip active"

                : "claim-filter-chip"
            }
            onClick={() =>
              setStatusFilter(
                "Submitted"
              )
            }
          >
            Submitted (
            {
              getStatusCount(
                "Submitted"
              )
            }
            )
          </button>


          <button
            type="button"
            className={
              statusFilter ===
              "Under Review"

                ? "claim-filter-chip active"

                : "claim-filter-chip"
            }
            onClick={() =>
              setStatusFilter(
                "Under Review"
              )
            }
          >
            Under Review (
            {
              getStatusCount(
                "Under Review"
              )
            }
            )
          </button>


          <button
            type="button"
            className={
              statusFilter ===
              "Assessment"

                ? "claim-filter-chip active"

                : "claim-filter-chip"
            }
            onClick={() =>
              setStatusFilter(
                "Assessment"
              )
            }
          >
            Assessment (
            {
              getStatusCount(
                "Assessment"
              )
            }
            )
          </button>


          <button
            type="button"
            className={
              statusFilter ===
              "Completed"

                ? "claim-filter-chip active"

                : "claim-filter-chip"
            }
            onClick={() =>
              setStatusFilter(
                "Completed"
              )
            }
          >
            Completed (
            {
              getStatusCount(
                "Completed"
              )
            }
            )
          </button>


        </div>

      </div>


      {/* =========================
         CLAIM LIST
         ========================= */}

      {filteredClaims.length === 0 ? (

        <div className="claims-empty">


          <div className="claims-empty-icon">
            🔍
          </div>


          <h3>
            No Matching Claims
          </h3>


          <p>
            Try searching with a different Claim ID, vehicle or status.
          </p>


          <button
            type="button"
            className="secondary-button"
            onClick={() => {

              setSearchTerm("");

              setStatusFilter(
                "All"
              );

            }}
          >
            Clear Filters
          </button>


        </div>

      ) : (

        <div className="claims-list">


          {filteredClaims.map(
            (claim, index) => (

              <div
                className="claim-card"
                key={
                  claim.claimId ||
                  index
                }
              >


                {/* CLAIM TOP */}

                <div className="claim-card-top">


                  <div className="claim-card-id">

                    <div className="claim-card-icon">
                      📄
                    </div>


                    <div>

                      <span>
                        Claim ID
                      </span>

                      <h3>
                        {
                          claim.claimId
                        }
                      </h3>

                    </div>

                  </div>


                  {/* DAY 17 DYNAMIC STATUS */}

                  <span
                    className={
                      claim.status ===
                      "Completed"

                        ? "claim-status completed"

                        : claim.status ===
                          "Assessment"

                        ? "claim-status assessment"

                        : claim.status ===
                          "Under Review"

                        ? "claim-status review"

                        : "claim-status submitted"
                    }
                  >

                    ●{" "}

                    {
                      claim.status ||
                      "Submitted"
                    }

                  </span>


                </div>


                {/* CLAIM INFO */}

                <div className="claim-card-info">


                  <div>

                    <span>
                      Incident
                    </span>

                    <strong>

                      {
                        claim
                          .incident
                          ?.incidentType

                        ||

                        "Not provided"

                      }

                    </strong>

                  </div>


                  <div>

                    <span>
                      Date
                    </span>

                    <strong>

                      {
                        claim
                          .incident
                          ?.date

                        ||

                        "Not provided"

                      }

                    </strong>

                  </div>


                  <div>

                    <span>
                      Vehicle
                    </span>

                    <strong>

                      {
                        claim
                          .vehicle
                          ?.vehicleMake

                        ||

                        "Not provided"

                      }

                      {" "}

                      {
                        claim
                          .vehicle
                          ?.vehicleModel

                        ||

                        ""

                      }

                    </strong>

                  </div>


                  <div>

                    <span>
                      Submitted
                    </span>

                    <strong>

                      {
                        claim.submittedAt

                        ||

                        "Not available"

                      }

                    </strong>

                  </div>


                </div>


                {/* ACTIONS */}

                <div className="claim-card-actions">


                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() =>
                      handleViewDetails(
                        claim
                      )
                    }
                  >
                    👁 View Details
                  </button>


                  <button
                    type="button"
                    className="continue"
                    onClick={() =>
                      onTrackClaim(
                        claim
                      )
                    }
                  >
                    📍 Track Claim
                  </button>


                </div>


              </div>

            )

          )}

        </div>

      )}


      {/* =========================
         RESTORE DRAFT
         ========================= */}

      <div className="claims-draft-area">


        <span>
          Have an unfinished claim?
        </span>


        <button
          type="button"
          onClick={
            onRestoreDraft
          }
        >
          📋 Restore Draft
        </button>


      </div>


    </div>

  );

}


/* =========================
   DETAIL ITEM
   ========================= */

function DetailItem({

  label,

  value

}) {

  return (

    <div className="claim-detail-item">

      <span>
        {label}
      </span>

      <strong>
        {value || "Not provided"}
      </strong>

    </div>

  );

}


export default MyClaims;