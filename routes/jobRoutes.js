const express = require("express");
const router = express.Router();

const {
  getAllJobs,
  getJobById,
  createJob,
  updateJobById,
  deleteJob,
} = require("../controllers/jobController");

router.get("/", getAllJobs);
router.get("/:id", getJobById);
router.post("/", createJob);
router.put("/:id", updateJobById);
router.delete("/:id", deleteJob);

module.exports = router;
