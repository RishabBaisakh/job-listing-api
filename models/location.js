const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
    trim: true,
  },
  province: {
    type: String,
    required: true,
    enum: [
      "AB",
      "BC",
      "MB",
      "NB",
      "NL",
      "NS",
      "NT",
      "NU",
      "ON",
      "PE",
      "QC",
      "SK",
      "YT",
    ],
  },
});

const Location = mongoose.model("Locaiton", locationSchema);

module.exports = Location;
