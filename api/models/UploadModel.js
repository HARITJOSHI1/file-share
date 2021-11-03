const mongoose = require("mongoose");
const { finder } = require("../utils/finder");
const User = require("./UserModel");

const uploadSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },

  size: {
    type: Number,
    required: true,
  },

  createdAt: {
    type: Date,
    required: true,
  },

  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});


uploadSchema.pre("save", async function (next) {
  const {id} = await User.findOne().sort("-createdAt");
  this.userId = id;
  next();
});

uploadSchema.post("save", async function (doc) {
  await finder(doc);
});

module.exports = mongoose.model("Upload", uploadSchema);
