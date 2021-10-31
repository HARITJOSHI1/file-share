const mongoose = require("mongoose");
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


// uploadSchema.pre("save", function (next) {
//   this.populate({ path: "userId"});
//   next();
// });

module.exports = mongoose.model("Upload", uploadSchema);
