const express = require("express");
const {
  updateCompanyById,
  fetchCompanyById,
} = require("../controllers/companyController");
const router = express.Router();

router.put("/:id", updateCompanyById);
router.get("/:id", fetchCompanyById);

module.exports = router;
