const express = require("express");

const router = express.Router();

// AI claim extraction endpoint
router.post("/extract-claim", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        message: "Text is required",
      });
    }

    // Temporary response until LLM integration
    const extractedData = {
      incidentDescription: text,
    };

    res.status(200).json({
      success: true,
      message: "Claim information extracted successfully",
      data: extractedData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;