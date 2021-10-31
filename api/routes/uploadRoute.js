const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/UploadController");

router.post(
  '/uploads',
  uploadController.uploadSingle,
  uploadController.storingFiles,
  uploadController.fileMetaData,
  uploadController.upload
);

module.exports = router;
