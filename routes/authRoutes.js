const express = require("express");
const {
  registerEmployer,
  loginEmployer,
} = require("../controllers/authController");
const router = express.Router();

router.post("/register", registerEmployer);
router.post("/login", loginEmployer);

module.exports = router;
