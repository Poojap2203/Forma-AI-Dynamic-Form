const express = require("express");
const { GoogleGenAI } = require("@google/genai");

const router = express.Router();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Extract claim information using Gemini
router.post("/extract-claim", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        message: "Text is required",
      });
    }

    const prompt = `
You are an insurance claim assistant.

Extract the following information from the user's description:

- incidentType
- incidentDate
- incidentTime
- location
- injured
- injuredPerson
- injuryDescription
- policeReportFiled
- policeStation
- firNumber
- incidentDescription
- vehicle
- vehicleNumber
- damage
- damageDescription

Return ONLY valid JSON.
If information is not available, use null.
For damage, return an array of strings.

User description:
${text}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    const result = response.text;

let extractedData;

try {
  const cleanedResult = result
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  extractedData = JSON.parse(cleanedResult);
} catch (error) {
  return res.status(500).json({
    success: false,
    message: "Gemini returned an invalid JSON response",
    rawResponse: result,
  });
}

    res.status(200).json({
      success: true,
      message: "Claim information extracted successfully",
      data: extractedData,
    });
  } catch (error) {
    console.error("Gemini error:", error);

    res.status(500).json({
      success: false,
      message: "AI extraction failed",
      error: error.message,
    });
  }
});

module.exports = router;