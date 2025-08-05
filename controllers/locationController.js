const { ERROR_MESSAGES } = require("../constants/errors");
const Location = require("../models/location");

const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    return res.status(200).json(locations);
  } catch (error) {
    console.error("Error fetching locations:", error);
    return res
      .status(500)
      .json({
        message: ERROR_MESSAGES.LOCATION_FETCH_FAILED,
        details: error.message,
      });
  }
};

module.exports = {
  getAllLocations,
};
