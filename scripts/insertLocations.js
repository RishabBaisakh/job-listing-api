require("dotenv").config();
const mongoose = require("mongoose");
const Location = require("../models/location");

const MONGO_URI = process.env.MONGO_URI;

const locations = [
  { city: "Toronto", province: "ON" },
  { city: "Ottawa", province: "ON" },
  { city: "Vancouver", province: "BC" },
  { city: "Victoria", province: "BC" },
  { city: "Calgary", province: "AB" },
  { city: "Edmonton", province: "AB" },
  { city: "Winnipeg", province: "MB" },
  { city: "Fredericton", province: "NB" },
  { city: "St. John's", province: "NL" },
  { city: "Halifax", province: "NS" },
  { city: "Yellowknife", province: "NT" },
  { city: "Iqaluit", province: "NU" },
  { city: "Charlottetown", province: "PE" },
  { city: "Quebec City", province: "QC" },
  { city: "Montreal", province: "QC" },
  { city: "Regina", province: "SK" },
  { city: "Saskatoon", province: "SK" },
  { city: "Whitehorse", province: "YT" },
];

async function insertLocations() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    const result = await Location.insertMany(locations, { ordered: false });
    console.log(`Inserted ${result.length} locations`);

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (err) {
    console.error("Error inserting locations:", err);
    await mongoose.disconnect();
  }
}

insertLocations();
