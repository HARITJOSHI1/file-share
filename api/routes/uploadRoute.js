const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/UploadController");

router.post(
  '/upload',
  uploadController.uploadSingle,
  uploadController.resizeImg,
  uploadController.upload
);

module.exports = router;
