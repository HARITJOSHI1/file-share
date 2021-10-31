const mongoose = require("mongoose");
const validator = require("validator");
const schema = new mongoose.Schema({
  from: {
    type: String,
    trim: true,
    required: [true, "Please provide your email"],
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valid email address"],
  },

  sendTo: {
    type: String,
    required: [true, "Please provide reciever's email"],
    validate: [validator.isEmail, "Please enter a valid email address"],
    trim: true,
    lowercase: true,
  },

  message: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("User", schema);

