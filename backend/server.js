const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const claimRoutes = require("./routes/claimRoutes");
const aiRoutes = require("./routes/aiRoutes");
// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/claims", claimRoutes);
app.use("/api/ai", aiRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Forma AI Backend is running" });
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(5000, () => {
      console.log("Server running on http://localhost:5000");
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });