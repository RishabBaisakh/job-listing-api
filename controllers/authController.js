const { ERROR_MESSAGES } = require("../constants/errors");
const Company = require("../models/company");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { SUCCESS_MESSAGES } = require("../constants/success");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "3d", // TODO: Can think about this later
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
      company: company._id,
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
      error: error.message,
    });
  }
};

const loginEmployer = async (req, res) => {
  try {
    const requiredFields = ["email", "password", "accessCode"];
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: ERROR_MESSAGES.MISSING_REQUIRED_FIELDS,
        missing: missingFields,
      });
    }

    const { email, password, accessCode } = req.body;

    const user = await User.findOne({ email })
      .select("+password")
      .populate("company");
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .json({ message: ERROR_MESSAGES.INVALID_USERNAME_AND_PASSWORD });
    }

    if (accessCode !== user.company.accessCode) {
      return res
        .status(401)
        .json({ message: ERROR_MESSAGES.INVALID_ACCESS_CODE });
    }

    const token = createToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        company: user.company,
      },
    });
  } catch (error) {
    console.error("Error occurred while logging in the user", error);
    res.status(500).json({
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      error: error.message,
    });
  }
};

const logoutEmployer = (req, res) => {
  res
    .clearCookie("token")
    .status(200)
    .json({ message: SUCCESS_MESSAGES.LOGOUT });
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({ user });
  } catch (err) {
    res.status(401).json({ message: ERROR_MESSAGES.USER_NOT_FOUND });
  }
};

module.exports = {
  registerEmployer,
  loginEmployer,
  logoutEmployer,
  getCurrentUser,
};
