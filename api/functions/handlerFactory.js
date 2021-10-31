const catchAsync = require("../utils/catchAsync");
const superagent = require("superagent");
const { finder } = require("../utils/finder");

exports.post = (Model) =>
  catchAsync(async (req, res) => {
    // console.log("handler func " + req.body.info.sendTo);
    await Model.create(req.body);
    const num = await Model.countDocuments();
    await Model.find({})
      .populate({ path: "userId", select: "_id" });

    res.status(200).json({
      status: "success",
      message: `Uploaded successfully`,
    });
  });
