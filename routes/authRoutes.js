const express = require("express");
const {
  registerEmployer,
  loginEmployer,
  getCurrentUser,
} = require("../controllers/authController");
const requireAuth = require("../middlewares/requireAuth");
const router = express.Router();

router.post("/register", registerEmployer);
router.post("/login", loginEmployer);
router.get("/me", requireAuth, getCurrentUser);

module.exports = router;
