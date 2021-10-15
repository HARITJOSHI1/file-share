const multer = require("multer");
const sharp = require("sharp");

const ImageData = require("../models/UploadModel");
const catchAsync = require("../utils/catchAsync");

// const multerStorage = multer.memoryStorage();
// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("Image")) {
//     cb(null, file);
//   } else {
//     cb("File type must be an image", false);
//   }
// };
// const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
// exports.uploadSingle = upload.single("photo");

// exports.resizeImg = async (req, res, next) => {
//   if (!req.file) return next();
//   req.file.fileName = `${Date.now()}.jepg`;
//   await sharp(req.file.buffer)
//     .toFormat("jpeg")
//     .jpeg({ quantity: 90 })
//     .toFile(`../img/${req.file.fileName}`);
// next();
// };

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, file);
  } else {
    cb("File type must be an image", false);
  }
};
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
exports.uploadSingle = upload.array("photos", 100);

exports.resizeImg = catchAsync(async (req, res, next) => {
  if (!req.files) return next();
  req.body.images = [];
  await Promise.all(
    req.files.map((file, idx) => {
      const filename = `${Date.now()}-${idx + 1}.jpeg`;
      sharp(file.buffer)
        .toFormat("jpeg")
        .jpeg({ quantity: 90 })
        .toFile(`img/${filename}`);

      req.body.images.push(filename);
    })
  );

  next();
});

exports.upload = catchAsync(async (req, res) => {
  req.files.forEach((f, idx) => {
    ImageData.create({
      name: req.body.images[idx],
      mimeType: f.mimeType,
      size: f.size,
      createdAt: new Date(),
    });
  });

  res.status(200).json({
    status: "success",
    message: `Uploaded ${res.files.length} successfully`,
  });
});
