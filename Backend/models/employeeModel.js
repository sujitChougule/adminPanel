const mongoose = require("mongoose");
const validator = require("validator");
const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Enter valid email"],
  },
  number: {
    type: Number,
    required: true,
  },
  designation: {
    type: String,
    enum: ["HR", "Manager", "sales"],
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  // avatar: {
  //   public_id: {
  //     type: String,
  //   },
  //   url: {
  //     type: String,
  //   },
  // },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Employee", EmployeeSchema);
