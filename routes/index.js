const express = require("express");
const router = express.Router();

const jobRoutes = require("./jobRoutes");
const locationRoutes = require("./locationRoutes");
const companyRoutes = require("./companyRoutes");

router.use("/jobs", jobRoutes);
router.use("/locations", locationRoutes);
router.use("/companies", companyRoutes);

module.exports = router;
