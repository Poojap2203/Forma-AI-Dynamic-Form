const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema(
  {
    incidentType: {
      type: String,
      required: true,
    },

    incidentDate: String,
    incidentTime: String,
    location: String,

    injured: {
      type: Boolean,
      default: false,
    },

    injuredPerson: String,
    injuryDescription: String,

    policeReportFiled: {
      type: Boolean,
      default: false,
    },

    policeStation: String,
    firNumber: String,

    incidentDescription: String,

    vehicle: {
      type: String,
      required: true,
    },

    vehicleNumber: String,

    damage: [String],

    damageDescription: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Claim", claimSchema);