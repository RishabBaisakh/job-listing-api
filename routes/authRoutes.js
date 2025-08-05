const express = require("express");
const {
  registerEmployer,
  loginEmployer,
  getCurrentUser,
  logoutEmployer,
} = require("../controllers/authController");
const requireAuth = require("../middlewares/requireAuth");
const router = express.Router();

router.post("/register", registerEmployer);
router.post("/login", loginEmployer);
router.get("/me", requireAuth, getCurrentUser);
router.post("/logout", requireAuth, logoutEmployer);

module.exports = router;
