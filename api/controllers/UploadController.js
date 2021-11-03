const multer = require("multer");
const Upload = require("../models/UploadModel");
const catchAsync = require("../utils/catchAsync");
const factory = require("../functions/handlerFactory");
const {saveFileToDisk} = require("../utils/saveFileToDisk");

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
  if (file.mimetype.startsWith("application")) {
    cb(null, file);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
exports.uploadSingle = upload.single("file");

exports.storingFiles = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  req.body.data = [];
  const filename = `${Date.now()}.${req.file.originalname.split(".")[1]}`;

  saveFileToDisk(filename, req.file);
  req.body.data.push(filename);
  next();
});

exports.fileMetaData = catchAsync(async (req, res, next) => {
  req.body.name = req.body.data[0];
  req.body.size = req.file.size;
  req.body.createdAt = new Date();
  next();
});

exports.upload = factory.post(Upload);
