const mongoose = require("mongoose");
const { isURL } = require("validator");

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
  cover: {
    filename: String,
    path: String,
    url: String,
    mimType: {
      type: String,
      match: [
        /^image\/(jpeg|png|webp)$/,
        "Only JPEG, PNG, or WebP files are allowed.",
      ],
    },
    // size: {
    //   type: Number,
    //   max: [5 * 1024 * 1024, "Image must be smaller than 5MB."],
    // },
    originlName: String,
  },
  logo: {
    filename: String,
    path: String,
    url: String,
    mimType: {
      type: String,
      match: [
        /^image\/(jpeg|png|webp)$/,
        "Only JPEG, PNG, or WebP files are allowed.",
      ],
    },
    // size: {
    //   type: Number,
    //   max: [5 * 1024 * 1024, "Image must be smaller than 5MB."],
    // },
    originlName: String,
  },
  industry: {
    type: String,
    trim: true,
    maxlength: 100,
    required: [true, "Industry is required."],
  },
  website: {
    type: String,
    trim: true,
    validate: {
      validator: function (v) {
        return v ? isURL(v) : true; // allow empty/undefined values
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
    required: false,
  },
  headquarters: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
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
