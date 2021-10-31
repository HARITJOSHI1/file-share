const User = require("../models/UserModel");
const catchAsync = require("../utils/catchAsync");

exports.createUser = catchAsync(async (req, res) => {
  const { info, files } = req.body;
  const user = await User.create(info);
  req.user = user;
  res.status(200).json({
    status: "success",
    data: user
  });
});
