const express = require("express");
const router = express.Router();

const jobRoutes = require("./jobRoutes");

router.use("/jobs", jobRoutes);

module.exports = router;
