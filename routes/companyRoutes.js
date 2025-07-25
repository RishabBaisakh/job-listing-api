const express = require("express");
const { updateCompanyById } = require("../controllers/companyController");
const router = express.Router();

router.put("/:id", updateCompanyById);

module.exports = router;
