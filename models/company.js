const mongoose = require("mongoose");
const { isEmail } = require("validator");

const companySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
    minLength: [5, "Name must at least 5 characters."],
    maxLength: [30, "Name cannot exceed 70 characters."],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description is required."],
    minlength: [100, "Description must be at least 100 characters."],
    maxlength: [5000, "Description cannot exceed 5000 characters."],
    trim: true,
  },
  contactEmail: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  contactPhone: {
    type: String,
    required: [true, "Phone number is required."],
    match: /^\d{10}$/,
  },
  accessCode: {
    type: String,
    required: [true, "Access code is required."],
    unique: true,
    validate: {
      validator: function (v) {
        return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(
          v
        );
      },
      message: (props) => `${props.value} is not a valid UUIDv4!`,
    },
    minlength: 36,
    maxlength: 36,
  },
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
