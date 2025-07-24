require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/database");
const routes = require("./routes");

const port = process.env.PORT || 3000;

const app = express();

// middlewares
app.use(express.json());

// Routes
app.use("/api", routes);

// Connect to DB and start server
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server due to DB error", err);
    process.exit(1);
  });
