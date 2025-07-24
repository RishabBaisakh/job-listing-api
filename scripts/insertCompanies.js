require("dotenv").config();
const mongoose = require("mongoose");
const Company = require("../models/company");

const MONGO_URI = process.env.MONGO_URI;

const companies = [
  {
    name: "Northern Tech Solutions",
    description:
      "Northern Tech Solutions is a pioneering software company delivering cloud-based infrastructure solutions, enterprise-grade tools, and digital transformation services to clients across North America.",
    contactEmail: "contact@northerntech.ca",
    contactPhone: "+14165551234",
  },
  {
    name: "Prairie Health Systems",
    description:
      "Prairie Health Systems provides cutting-edge digital platforms for patient management, telemedicine, and clinical analytics to improve healthcare delivery throughout Canada.",
    contactEmail: "info@prairiehealth.ca",
    contactPhone: "+12045552345",
  },
  {
    name: "Atlantic Green Energy",
    description:
      "Atlantic Green Energy is a renewable energy company based in Nova Scotia focused on wind, solar, and hydroelectric solutions to promote sustainable living and reduce carbon emissions.",
    contactEmail: "hello@atlanticgreen.ca",
    contactPhone: "+19025553456",
  },
  {
    name: "Maple AI Innovations",
    description:
      "Maple AI Innovations creates AI-driven products for natural language processing, image recognition, and business automation. Their mission is to make AI accessible for all enterprises.",
    contactEmail: "support@mapleai.ca",
    contactPhone: "+15145554567",
  },
  {
    name: "Urban Mobility Group",
    description:
      "Urban Mobility Group is a transportation startup revolutionizing how Canadians commute using smart mobility apps, shared electric vehicles, and route optimization technology.",
    contactEmail: "partners@urbanmobility.ca",
    contactPhone: "+16475555678",
  },
];

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

insertCompanies();
