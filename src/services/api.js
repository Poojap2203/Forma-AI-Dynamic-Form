 const API_BASE_URL = "http://localhost:5000";

// AI CLAIM EXTRACTION
export const extractClaim = async (text) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/ai/extract-claim`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || "Failed to extract claim information"
      );
    }

    return result;
  } catch (error) {
    console.error("AI Claim Extraction Error:", error);
    throw error;
  }
};

// SAVE CLAIM
export const saveClaim = async (claimData) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/claims`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(claimData),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || "Failed to save claim"
      );
    }

    return result;
  } catch (error) {
    console.error("Save Claim Error:", error);
    throw error;
  }
};