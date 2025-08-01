const { ERROR_MESSAGES } = require("../constants/errors");
const Company = require("../models/company");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

const registerEmployer = async (req, res) => {
  try {
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "password",
      "accessCode",
    ];
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: ERROR_MESSAGES.MISSING_REQUIRED_FIELDS,
        missing: missingFields,
      });
    }

    const { firstName, lastName, email, password, accessCode } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: ERROR_MESSAGES.EMAIL_ALREADY_EXISTS });
    }

    const company = await Company.findOne({ accessCode });

    if (!company) {
      return res
        .status(400)
        .json({ message: ERROR_MESSAGES.INVALID_ACCESS_CODE });
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      company,
    });

    res.status(201).json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      company: user.company,
    });
  } catch (error) {
    console.error("Error occurred while registering employer", error.message);
    res.status(500).json({
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      error: err.message,
    });
  }
};

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email }).select("+password");
//     if (!user || !(await user.comparePassword(password))) {
//       return res.status(401).json({ error: "Invalid email or password" });
//     }

//     const token = createToken(user._id);
//     res.status(200).json({
//       message: "Login successful",
//       token,
//       user: { _id: user._id, name: user.name, email: user.email },
//     });
//   } catch (err) {
//     res.status(500).json({ error: "Login failed" });
//   }
// };

module.exports = { registerEmployer };
