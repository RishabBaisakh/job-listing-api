const { ERROR_MESSAGES } = require("../constants/errors");
const Company = require("../models/company");

const updateCompanyById = async (req, res) => {
  try {
    const updatedCompany = await Company.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedCompany) {
      return res
        .status(404)
        .json({ message: ERROR_MESSAGES.COMPANY_NOT_FOUND });
    }

    res.status(200).json(updatedCompany);
  } catch (error) {
    res.status(400).json({
      message: ERROR_MESSAGES.COMPANY_UPDATE_FAILED,
      details: error.message,
    });
  }
};

const fetchCompanyById = async (req, res) => {
  // TODO: Attach Access Code to the api somehow
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: ERROR_MESSAGES.COMPANY_ID_REQUIRED,
        missing: ["id"],
      });
    }
    const company = await Company.findOne({ _id: id });
    res.status(200).json({ company });
  } catch (error) {
    res.status(400).json({
      message: ERROR_MESSAGES.COMPANY_NOT_FOUND,
      details: error.message,
    });
  }
};

module.exports = {
  updateCompanyById,
  fetchCompanyById,
};
