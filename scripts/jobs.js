require("dotenv").config();
const mongoose = require("mongoose");
const Job = require("../models/job");

const MONGO_URI = process.env.MONGO_URI;

async function duplicateJobs() {
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

    const jobs = await Job.find({});

    if (!jobs.length) {
      console.log("No jobs found in the db");
      return;
    }

    const duplicationFactor = 8;
    let duplicatedJobs = [];

    for (let i = 0; i < duplicationFactor; i++) {
      jobs.forEach((job) => {
        const jobObj = job.toObject();
        delete jobObj._id;

        duplicatedJobs.push(jobObj);
      });
    }
    console.log("🚀 ~ duplicateJobs ~ duplicatedJobs:", duplicatedJobs.length);

    const result = await Job.insertMany(duplicatedJobs, { ordered: false });
    console.log("🚀 ~ duplicateJobs ~ result:", result);
    console.log(`Inserted ${result.length} jobs`);

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (err) {
    console.error("Error inserting companies:", err.message);
    await mongoose.disconnect();
  }
}

duplicateJobs();
