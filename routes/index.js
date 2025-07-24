const express = require("express");
const router = express.Router();

const jobRoutes = require("./jobRoutes");
const locationRoutes = require("./locationRoutes");

router.use("/jobs", jobRoutes);
router.use("/locations", locationRoutes);

module.exports = router;
