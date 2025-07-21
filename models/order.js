const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required."],
    minLength: [5, "Title must at least 5 characters."],
    maxLength: [70, "Title cannot exceed 70 characters."],
    trim: true,
  },
  type: {
    type: String,
    required: [true, "Type is required."],
    enum: {
      values: ["full-time", "part-time", "contract", "internship"],
      message:
        "Type must be one of full-time, part-time, contract or internship.",
    },
    default: "full-time",
    set: (v) => v.toLowerCase(), // normalize input
  },
  description: {
    type: String,
    required: [true, "Description is required."],
    minlength: [100, "Description must be at least 100 characters."],
    maxlength: [5000, "Description cannot exceed 5000 characters."],
    trim: true,
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
  },
  salary: {
    type: String,
    required: [true, "Salary is required."],
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
