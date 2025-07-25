const Job = require("../models/job");
const Company = require("../models/company");

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("location company");
    return res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch jobs", details: error.message });
  }
};

const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("location company");
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    return res.status(200).json(job);
  } catch (error) {
    console.error("Error fetching job:", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch job", details: error.message });
  }
};

async function createJob(req, res) {
  try {
    const {
      title,
      type,
      location,
      description,
      salary,
      company: companyData,
    } = req.body;

    let company = await Company.findOne({ name: companyData.name });

    if (!company) {
      company = await Company.create(companyData);
    }

    const job = await Job.create({
      title,
      type,
      location,
      description,
      salary,
      company: company._id,
    });

    res.status(201).json(job);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to create job", details: err.message });
  }
}

const updateJobById = async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.status(200).json(updatedJob);
  } catch (error) {
    console.error("Error updating job:", error);
    return res
      .status(400)
      .json({ message: "Failed to update job", details: error.message });
  }
};

const deleteJob = async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    return res
      .status(500)
      .json({ message: "Failed to delete job", details: error.message });
  }
};

module.exports = {
  getAllJobs,
  getJobById,
  createJob,
  updateJobById,
  deleteJob,
};
