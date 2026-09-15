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

    if (!text || !text.trim()) {
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

Rules:
1. Return ONLY valid JSON.
2. Do not use Markdown or code fences.
3. If information is unavailable, use null.
4. For injured and policeReportFiled, use true, false, or null.
5. For damage, return an array of strings.

User description:
${text}
`;

    // Retry Gemini request up to 3 times
    let response;

    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        response = await ai.models.generateContent({
          model: "gemini-3.6-flash",
          contents: prompt,
        });

        break;
      } catch (error) {
        if (attempt === 3) {
          throw error;
        }

        console.log(
          `Gemini attempt ${attempt} failed. Retrying...`
        );

        await new Promise((resolve) =>
          setTimeout(resolve, 2000 * attempt)
        );
      }
    }

    const result = response.text;

    let extractedData;

    try {
      const cleanedResult = result
        .replace(/```json/gi, "")
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
    console.error("Gemini error:", error.message);

    res.status(500).json({
      success: false,
      message: "AI extraction failed",
      error: error.message,
    });
  }
});

module.exports = router;