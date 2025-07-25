const Location = require("../models/location");

const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    return res.status(200).json(locations);
  } catch (error) {
    console.error("Error fetching locations:", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch locations", details: error.message });
  }
};

module.exports = {
  getAllLocations,
};
