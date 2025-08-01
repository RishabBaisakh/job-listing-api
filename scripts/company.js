require("dotenv").config();
const mongoose = require("mongoose");
const Company = require("../models/company");
const { v4: uuidv4 } = require("uuid");

const MONGO_URI = process.env.MONGO_URI;

async function insertCompanies() {
  if (!MONGO_URI) {
    console.error("MONGO_URI is not defined in .env file.");
    return;
  }

  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    const result = await Company.insertMany(companies, { ordered: false });
    console.log(`Inserted ${result.length} companies`);

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (err) {
    console.error("Error inserting companies:", err.message);
    await mongoose.disconnect();
  }
}

async function addAccessCodesToCompanies() {
  if (!MONGO_URI) {
    console.error("MONGO_URI is not defined in .env file.");
    return;
  }

  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    const companies = await Company.find();

    const updatePromises = companies.map((company) => {
      company.accessCode = uuidv4();
      return company.save();
    });

    await Promise.all(updatePromises);

    console.log(
      `Updated ${updatePromises.length} companies with access codes.`
    );

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (err) {
    console.error("Error updating companies:", err.message);
    await mongoose.disconnect();
  }
}

addAccessCodesToCompanies();
// insertCompanies();
