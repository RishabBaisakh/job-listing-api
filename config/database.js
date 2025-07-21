const mongoose = require("mongoose");

const mongoUri = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 20000,
    });
    console.log(`MongoDB connection: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error while connecting to the db: ", error.message);
    throw error;
  }
};

module.exports = {
  connectDB,
};
