const express = require("express");
const Claim = require("../models/Claim");

const router = express.Router();

// Create a new claim
router.post("/", async (req, res) => {
  try {
    const claim = await Claim.create(req.body);

    res.status(201).json({
      success: true,
      message: "Claim created successfully",
      data: claim,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// Get all claims
router.get("/", async (req, res) => {
  try {
    const claims = await Claim.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: claims.length,
      data: claims,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;