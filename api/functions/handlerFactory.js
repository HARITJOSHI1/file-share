const catchAsync = require("../utils/catchAsync");

exports.get = (Model) =>
  catchAsync(async (req, res, next, user) => {
    const _id = req.params.id;
    const data = await Model.findOne({ _id });
    if (res) {
      res.status(200).json({
        status: "success",
        results: data?.length || 1,
        data,
      });
    } else {
      user.data = data;
    }
  });

exports.post = (Model) =>
  catchAsync(async (req, res) => {
    await Model.create(req.body);
    setTimeout(() => {
      res.status(200).json({
        status: "success",
        message: `Uploaded successfully`,
      });
    }, 1000 * 4);
  });
