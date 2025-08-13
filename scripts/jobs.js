require("dotenv").config();
const mongoose = require("mongoose");
const Job = require("../models/job");

const MONGO_URI = process.env.MONGO_URI;

async function updateJobTimestamp() {
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

    const jobs = await Job.find({}).sort({ createdAt: -1 });

    if (!jobs.length) {
      console.log("No jobs found in the db");
      return;
    }
    const bulkOps = jobs.map((job, index) => {
      const newDate = new Date();
      newDate.setDate(newDate.getDate() - index);

      return {
        updateOne: {
          filter: { _id: job._id },
          update: { $set: { datePosted: newDate } },
        },
      };
    });

    const result = await Job.bulkWrite(bulkOps);
    console.log(`Updated ${result.modifiedCount} jobs`);
    console.log("🚀 ~ updateJobTimestamp ~ jobs:", jobs);

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (err) {
    console.error("Error inserting companies:", err.message);
    await mongoose.disconnect();
  }
}

updateJobTimestamp();
